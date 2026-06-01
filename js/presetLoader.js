/* js/presetLoader.js */

"use strict";

const PresetLoader = (()=>{

let presets = {};

async function init(){

    try{

        await loadAllPacks();

    }catch(e){

        console.error(
            "Preset load failed:",
            e
        );

    }

}

async function loadAllPacks(){

    const indexResponse =
    await fetch(
        "presets/index.json"
    );

    const packList =
    await indexResponse.json();

    presets = {};

    for(

        const packFile
        of
        packList

    ){

        await loadPack(
            packFile
        );

    }

    populateDropdown();

}

async function loadPack(file){

    const response =
    await fetch(

        "presets/" +
        file

    );

    const pack =
    await response.json();

    mergePack(pack);

}

function mergePack(pack){

    for(

        const name
        in
        pack

    ){

        presets[name] =
        pack[name];

    }

}

function populateDropdown(){

    presetList.innerHTML =
    "";

    const names =
    Object.keys(
        presets
    );

    names.sort();

    for(

        const name
        of
        names

    ){

        const option =
        document.createElement(
            "option"
        );

        option.value =
        name;

        option.textContent =
        name;

        presetList.appendChild(
            option
        );

    }

}

function loadSelectedPreset(){

    const selected =
    presetList.value;

    const preset =
    presets[selected];

    if(!preset){
        return;
    }

    if(
        typeof preset
        ===
        "string"
    ){

        mode.value =
        "mono";

        monoFormula.value =
        preset;

    }else{

        mode.value =
        "rgb";

        rFormula.value =
        preset.r || "0";

        gFormula.value =
        preset.g || "0";

        bFormula.value =
        preset.b || "0";

    }

    Storage.addHistory();

    Renderer.renderFrame();

}

function getPreset(name){

    return presets[name];

}

function getAllPresets(){

    return presets;

}

function addPreset(

    name,

    formula

){

    presets[name] =
    formula;

    populateDropdown();

}

function removePreset(name){

    delete presets[name];

    populateDropdown();

}

function count(){

    return Object.keys(
        presets
    ).length;

}

function randomPreset(){

    const keys =
    Object.keys(
        presets
    );

    if(
        keys.length===0
    ){
        return null;
    }

    const name =

    keys[
        Math.floor(
            Math.random()
            *
            keys.length
        )
    ];

    return {

        name,

        preset:
        presets[name]

    };

}

function loadRandomPreset(){

    const result =
    randomPreset();

    if(!result){
        return;
    }

    presetList.value =
    result.name;

    loadSelectedPreset();

}

function search(text){

    text =
    text.toLowerCase();

    return Object.keys(
        presets
    ).filter(

        name=>

        name
        .toLowerCase()
        .includes(
            text
        )

    );

}

return{

    init,

    loadAllPacks,

    loadSelectedPreset,

    getPreset,

    getAllPresets,

    addPreset,

    removePreset,

    count,

    randomPreset,

    loadRandomPreset,

    search

};

})();