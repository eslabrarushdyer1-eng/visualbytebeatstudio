/* js/audio.js */

"use strict";

const Audio = (()=>{

let ctx = null;

let processor = null;

let gainNode = null;

let enabled = false;

let sampleT = 0;

let audioFn = null;

let visualLinked = true;

let sampleRate = 44100;

function init(){

    const sr =
    document.getElementById(
        "sampleRate"
    );

    sampleRate =
    parseInt(
        sr.value
    );

    sr.addEventListener(
        "change",
        ()=>{

            sampleRate =
            parseInt(
                sr.value
            );

        }
    );

}

function compileFormula(){

    visualLinked =
    document.getElementById(
        "audioLinked"
    ).checked;

    if(visualLinked){

        if(mode.value==="mono"){

            audioFn =
            Compiler.compileAudio(
                monoFormula.value
            );

        }else{

            audioFn =
            Compiler.compileAudio(
                rFormula.value
            );

        }

    }else{

        audioFn =
        Compiler.compileAudio(
            audioFormula.value
        );

    }

}

function start(){

    if(enabled){
        return;
    }

    enabled = true;

    compileFormula();

    ctx =
    new (
        window.AudioContext ||
        window.webkitAudioContext
    )({

        sampleRate

    });

    gainNode =
    ctx.createGain();

    gainNode.gain.value =
    (
        volume.value
        /100
    );

    processor =
    ctx.createScriptProcessor(
        1024,
        0,
        1
    );

    processor.onaudioprocess =
    e=>{

        compileFormula();

        const out =
        e.outputBuffer
        .getChannelData(0);

        const now =
        performance.now();

        const time =
        (
            now-App.startTime
        )/1000;

        for(
            let i=0;
            i<out.length;
            i++
        ){

            let value =
            audioFn(

                sampleT,

                0,
                0,

                App.f,

                0,
                0,

                time,

                0,
                0,

                0,
                0,

                0,
                0,

                0,
                0,

                sampleT,

                sampleRate

            );

            value =
            Compiler.wrapByte(
                value
            );

            out[i] =
            (
                value
                /128
            ) - 1;

            sampleT++;

        }

    };

    processor.connect(
        gainNode
    );

    gainNode.connect(
        ctx.destination
    );

    processor.connect(
        ctx.destination
    );

}

function stop(){

    enabled = false;

    if(processor){

        processor.disconnect();

        processor = null;

    }

    if(gainNode){

        gainNode.disconnect();

        gainNode = null;

    }

    if(ctx){

        ctx.close();

        ctx = null;

    }

}

function setVolume(v){

    if(gainNode){

        gainNode.gain.value =
        v/100;

    }

}

function resetT(){

    sampleT = 0;

}

function isEnabled(){

    return enabled;

}

return {

    init,

    start,
    stop,

    resetT,

    setVolume,

    isEnabled,

    get sampleRate(){

        return sampleRate;

    }

};

})();