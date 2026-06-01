/* js/fullscreen.js */

"use strict";

const Fullscreen = (()=>{

let savedWidth = null;
let savedHeight = null;

let fullscreenActive = false;

function init(){

    document.addEventListener(

        "fullscreenchange",

        onFullscreenChange

    );

    window.addEventListener(

        "resize",

        handleResize

    );

    window.addEventListener(

        "orientationchange",

        handleResize

    );

}

function enter(){

    if(fullscreenActive){
        return;
    }

    savedWidth =
    width.value;

    savedHeight =
    height.value;

    const root =
    document.documentElement;

    if(root.requestFullscreen){

        root.requestFullscreen();

    }

}

function exit(){

    if(
        document.fullscreenElement
    ){

        document.exitFullscreen();

    }

}

function toggle(){

    if(
        document.fullscreenElement
    ){

        exit();

    }else{

        enter();

    }

}

function onFullscreenChange(){

    fullscreenActive =
    !!document.fullscreenElement;

    if(fullscreenActive){

        applyScreenSize();

    }else{

        restoreSize();

    }

}

function applyScreenSize(){

    const w =
    Math.max(

        window.innerWidth,

        screen.width

    );

    const h =
    Math.max(

        window.innerHeight,

        screen.height

    );

    width.value = w;
    height.value = h;

    Renderer.renderFrame();

}

function restoreSize(){

    if(savedWidth!==null){

        width.value =
        savedWidth;

    }

    if(savedHeight!==null){

        height.value =
        savedHeight;

    }

    Renderer.renderFrame();

}

function handleResize(){

    if(
        !fullscreenActive
    ){
        return;
    }

    width.value =
    window.innerWidth;

    height.value =
    window.innerHeight;

    Renderer.renderFrame();

}

function isFullscreen(){

    return fullscreenActive;

}

return{

    init,

    enter,
    exit,
    toggle,

    isFullscreen

};

})();