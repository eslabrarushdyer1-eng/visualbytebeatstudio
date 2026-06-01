/* js/renderer.js */

"use strict";

const Renderer = (()=>{

let canvas;
let ctx;

let renderTimer = null;

let fps = 0;
let lastFrameTime = 0;
let ft = 0;

let monoFn = null;

let rgbFns = null;

function init(){

    canvas =
    document.getElementById(
    "canvas"
    );

    ctx =
    canvas.getContext(
    "2d"
    );

}

function updateCompilers(){

    if(mode.value==="mono"){

        monoFn =
        Compiler.compileMono(
            monoFormula.value
        );

    }else{

        rgbFns =
        Compiler.compileRGB(

            rFormula.value,
            gFormula.value,
            bFormula.value

        );

    }

}

function renderFrame(){

    updateCompilers();

    const w =
    parseInt(
        width.value
    ) || 256;

    const h =
    parseInt(
        height.value
    ) || 256;

    canvas.width = w;
    canvas.height = h;

    const image =
    ctx.createImageData(
        w,
        h
    );

    const pixels =
    image.data;

    const now =
    performance.now();

    if(lastFrameTime!==0){

        ft =
        (now-lastFrameTime)
        /1000;

        fps =
        1/
        Math.max(
            ft,
            0.0001
        );

    }

    lastFrameTime = now;

    const time =
    (
        now-App.startTime
    )/1000;

    let pixelIndex = 0;

    for(let y=0;y<h;y++){

        for(let x=0;x<w;x++){

            const cx =
            x - w/2;

            const cy =
            y - h/2;

            const r =
            Math.hypot(
                cx,
                cy
            );

            const a =
            Math.atan2(
                cy,
                cx
            );

            const u =
            x/w;

            const v =
            y/h;

            const i =
            pixelIndex*4;

            if(mode.value==="mono"){

                let value =
                monoFn(

                    App.t,
                    x,
                    y,
                    App.f,

                    w,
                    h,

                    time,

                    cx,
                    cy,

                    r,
                    a,

                    u,
                    v,

                    fps,
                    ft,

                    pixelIndex,

                    Audio.sampleRate

                );

                value =
                Compiler.wrapByte(
                    value
                );

                pixels[i]   = value;
                pixels[i+1] = value;
                pixels[i+2] = value;
                pixels[i+3] = 255;

            }else{

                let rv =
                rgbFns.r(

                    App.t,
                    x,
                    y,
                    App.f,

                    w,
                    h,

                    time,

                    cx,
                    cy,

                    r,
                    a,

                    u,
                    v,

                    fps,
                    ft,

                    pixelIndex,

                    Audio.sampleRate

                );

                let gv =
                rgbFns.g(

                    App.t,
                    x,
                    y,
                    App.f,

                    w,
                    h,

                    time,

                    cx,
                    cy,

                    r,
                    a,

                    u,
                    v,

                    fps,
                    ft,

                    pixelIndex,

                    Audio.sampleRate

                );

                let bv =
                rgbFns.b(

                    App.t,
                    x,
                    y,
                    App.f,

                    w,
                    h,

                    time,

                    cx,
                    cy,

                    r,
                    a,

                    u,
                    v,

                    fps,
                    ft,

                    pixelIndex,

                    Audio.sampleRate

                );

                pixels[i] =
                Compiler.wrapByte(
                    rv
                );

                pixels[i+1] =
                Compiler.wrapByte(
                    gv
                );

                pixels[i+2] =
                Compiler.wrapByte(
                    bv
                );

                pixels[i+3] =
                255;

            }

            pixelIndex++;

            App.t++;

        }

    }

    ctx.putImageData(
        image,
        0,
        0
    );

    App.f++;

    updateVariableView(
        w,
        h,
        time,
        pixelIndex
    );

}

function updateVariableView(
    w,
    h,
    time,
    pixelCount
){

    variablesView.textContent =

`t=${App.t}
f=${App.f}

w=${w}
h=${h}

time=${time.toFixed(3)}

fps=${fps.toFixed(1)}
ft=${ft.toFixed(4)}

pixels=${pixelCount}

sampleRate=${Audio.sampleRate}`;

}

function play(){

    stop();

    const hz =
    parseInt(
        document
        .getElementById(
        "hz"
        ).value
    ) || 30;

    renderTimer =
    setInterval(

        renderFrame,

        1000/hz

    );

}

function stop(){

    if(renderTimer){

        clearInterval(
            renderTimer
        );

        renderTimer =
        null;

    }

}

function exportPNG(){

    const a =
    document
    .createElement(
        "a"
    );

    a.href =
    canvas.toDataURL(
        "image/png"
    );

    a.download =
    "visual-bytebeat.png";

    a.click();

}

function getCanvas(){

    return canvas;

}

return {

    init,

    renderFrame,

    play,
    stop,

    exportPNG,

    getCanvas

};

})();