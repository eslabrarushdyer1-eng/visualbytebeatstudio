/* js/storage.js */

"use strict";

const Storage = (()=>{

const SETTINGS_KEY =
"vb_settings";

const HISTORY_KEY =
"vb_history";

const MAX_HISTORY =
20;

function init(){

    loadSettings();
    loadHistory();

}

function saveSettings(){

    const settings = {

        mode:
        mode.value,

        width:
        width.value,

        height:
        height.value,

        hz:
        hz.value,

        monoFormula:
        monoFormula.value,

        rFormula:
        rFormula.value,

        gFormula:
        gFormula.value,

        bFormula:
        bFormula.value,

        audioFormula:
        audioFormula.value,

        audioEnabled:
        audioEnabled.checked,

        audioLinked:
        audioLinked.checked,

        sampleRate:
        sampleRate.value,

        volume:
        volume.value

    };

    localStorage.setItem(

        SETTINGS_KEY,

        JSON.stringify(
            settings
        )

    );

}

function loadSettings(){

    const raw =
    localStorage.getItem(
        SETTINGS_KEY
    );

    if(!raw){
        return;
    }

    try{

        const s =
        JSON.parse(raw);

        if(
            s.mode!==undefined
        ){
            mode.value =
            s.mode;
        }

        if(
            s.width!==undefined
        ){
            width.value =
            s.width;
        }

        if(
            s.height!==undefined
        ){
            height.value =
            s.height;
        }

        if(
            s.hz!==undefined
        ){
            hz.value =
            s.hz;
        }

        if(
            s.monoFormula!==undefined
        ){
            monoFormula.value =
            s.monoFormula;
        }

        if(
            s.rFormula!==undefined
        ){
            rFormula.value =
            s.rFormula;
        }

        if(
            s.gFormula!==undefined
        ){
            gFormula.value =
            s.gFormula;
        }

        if(
            s.bFormula!==undefined
        ){
            bFormula.value =
            s.bFormula;
        }

        if(
            s.audioFormula!==undefined
        ){
            audioFormula.value =
            s.audioFormula;
        }

        if(
            s.audioEnabled!==undefined
        ){
            audioEnabled.checked =
            s.audioEnabled;
        }

        if(
            s.audioLinked!==undefined
        ){
            audioLinked.checked =
            s.audioLinked;
        }

        if(
            s.sampleRate!==undefined
        ){
            sampleRate.value =
            s.sampleRate;
        }

        if(
            s.volume!==undefined
        ){
            volume.value =
            s.volume;
        }

    }catch(e){

        console.error(
            e
        );

    }

}

function addHistory(){

    const entry = {

        date:
        new Date()
        .toLocaleString(),

        mode:
        mode.value,

        mono:
        monoFormula.value,

        r:
        rFormula.value,

        g:
        gFormula.value,

        b:
        bFormula.value,

        audio:
        audioFormula.value

    };

    let history =
    getHistory();

    history.unshift(
        entry
    );

    history =
    history.slice(
        0,
        MAX_HISTORY
    );

    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(
            history
        )

    );

    loadHistory();

}

function getHistory(){

    const raw =
    localStorage.getItem(
        HISTORY_KEY
    );

    if(!raw){

        return [];

    }

    try{

        return JSON.parse(
            raw
        );

    }catch(e){

        return [];

    }

}

function loadHistory(){

    const history =
    getHistory();

    historyView.innerHTML =
    "";

    history.forEach(

        (entry,index)=>{

            const btn =
            document.createElement(
                "button"
            );

            btn.className =
            "historyButton";

            btn.textContent =
            "#" +
            (
                index+1
            );

            btn.title =
            entry.date;

            btn.onclick =
            ()=>{

                mode.value =
                entry.mode;

                monoFormula.value =
                entry.mono;

                rFormula.value =
                entry.r;

                gFormula.value =
                entry.g;

                bFormula.value =
                entry.b;

                audioFormula.value =
                entry.audio;

                Renderer.renderFrame();

            };

            historyView.appendChild(
                btn
            );

        }

    );

}

function clearHistory(){

    localStorage.removeItem(
        HISTORY_KEY
    );

    loadHistory();

}

function resetEverything(){

    localStorage.removeItem(
        SETTINGS_KEY
    );

    localStorage.removeItem(
        HISTORY_KEY
    );

    loadHistory();

}

return{

    init,

    saveSettings,
    loadSettings,

    addHistory,
    loadHistory,

    clearHistory,

    resetEverything

};

})();