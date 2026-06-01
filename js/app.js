/* js/app.js */

"use strict";

const App = (()=>{

let initialized = false;

let t = 0;
let f = 0;

let startTime =
performance.now();

async function init(){

    if(initialized){
        return;
    }

    initialized = true;

    Renderer.init();

    Audio.init();

    Fullscreen.init();

    Storage.init();

    await PresetLoader.init();

    bindUI();

    Renderer.renderFrame();

}

function bindUI(){

    playBtn.addEventListener(

        "click",

        ()=>{

            Renderer.play();

            if(
                audioEnabled.checked
            ){

                Audio.start();

            }

            Storage.saveSettings();

        }

    );

    stopBtn.addEventListener(

        "click",

        ()=>{

            Renderer.stop();

            Audio.stop();

            Storage.saveSettings();

        }

    );

    renderBtn.addEventListener(

        "click",

        ()=>{

            Renderer.renderFrame();

            Storage.saveSettings();

        }

    );

    resetTBtn.addEventListener(

        "click",

        ()=>{

            t = 0;

            Audio.resetT();

            Renderer.renderFrame();

        }

    );

    resetFBtn.addEventListener(

        "click",

        ()=>{

            f = 0;

            Renderer.renderFrame();

        }

    );

    resetAllBtn.addEventListener(

        "click",

        ()=>{

            t = 0;

            f = 0;

            startTime =
            performance.now();

            Audio.resetT();

            Renderer.renderFrame();

        }

    );

    fullscreenBtn.addEventListener(

        "click",

        ()=>{

            Fullscreen.toggle();

        }

    );

    pngBtn.addEventListener(

        "click",

        ()=>{

            Renderer.exportPNG();

        }

    );

    loadPresetBtn.addEventListener(

        "click",

        ()=>{

            PresetLoader
            .loadSelectedPreset();

            Storage.saveSettings();

        }

    );

    volume.addEventListener(

        "input",

        ()=>{

            Audio.setVolume(

                parseInt(
                    volume.value
                )

            );

            Storage.saveSettings();

        }

    );

    audioEnabled.addEventListener(

        "change",

        ()=>{

            if(
                audioEnabled.checked
            ){

                Audio.start();

            }else{

                Audio.stop();

            }

            Storage.saveSettings();

        }

    );

    mode.addEventListener(

        "change",

        ()=>{

            updateModeUI();

            Renderer.renderFrame();

            Storage.saveSettings();

        }

    );

    monoFormula.addEventListener(

        "input",

        ()=>{

            Renderer.renderFrame();

        }

    );

    rFormula.addEventListener(

        "input",

        ()=>{

            Renderer.renderFrame();

        }

    );

    gFormula.addEventListener(

        "input",

        ()=>{

            Renderer.renderFrame();

        }

    );

    bFormula.addEventListener(

        "input",

        ()=>{

            Renderer.renderFrame();

        }

    );

    audioFormula.addEventListener(

        "input",

        ()=>{

            Storage.saveSettings();

        }

    );

    width.addEventListener(

        "change",

        ()=>{

            Renderer.renderFrame();

            Storage.saveSettings();

        }

    );

    height.addEventListener(

        "change",

        ()=>{

            Renderer.renderFrame();

            Storage.saveSettings();

        }

    );

    hz.addEventListener(

        "change",

        ()=>{

            Storage.saveSettings();

        }

    );

    sampleRate.addEventListener(

        "change",

        ()=>{

            Storage.saveSettings();

        }

    );

    updateModeUI();

}

function updateModeUI(){

    if(
        mode.value==="mono"
    ){

        rgbPanel.style.display =
        "none";

    }else{

        rgbPanel.style.display =
        "block";

    }

}

return{

    init,

    get t(){

        return t;

    },

    set t(v){

        t = v;

    },

    get f(){

        return f;

    },

    set f(v){

        f = v;

    },

    get startTime(){

        return startTime;

    }

};

})();

window.addEventListener(

    "load",

    ()=>{

        App.init();

    }

);
