/* js/compiler.js */

"use strict";

const Compiler = (()=>{

function rand(){
    return Math.random();
}

function fract(x){
    return x - Math.floor(x);
}

function clamp(x,a,b){
    return Math.min(
        Math.max(x,a),
        b
    );
}

function mix(a,b,t){
    return a + (b-a)*t;
}

function smoothstep(a,b,x){

    let t =
    clamp(
        (x-a)/(b-a),
        0,
        1
    );

    return
    t*t*(3-2*t);

}

function wrapByte(v){

    return (v|0)&255;

}

function compile(expr){

    return new Function(

        "t",
        "x",
        "y",
        "f",

        "w",
        "h",

        "time",

        "cx",
        "cy",

        "r",
        "a",

        "u",
        "v",

        "fps",
        "ft",

        "pixelIndex",

        "sampleRate",

`
const {

sin,
cos,
tan,

asin,
acos,
atan,
atan2,

sqrt,
cbrt,

pow,

abs,
sign,

floor,
ceil,
round,
trunc,

exp,

log,
log2,
log10,

hypot,

min,
max,

PI,
E

} = Math;

try{

return (${expr});

}catch(e){

return 0;

}
`
    );

}

function compileMono(expr){

    return compile(expr);

}

function compileRGB(r,g,b){

    return {

        r:
        compile(r),

        g:
        compile(g),

        b:
        compile(b)

    };

}

function compileAudio(expr){

    return compile(expr);

}

return {

    rand,
    fract,
    clamp,
    mix,
    smoothstep,

    wrapByte,

    compile,
    compileMono,
    compileRGB,
    compileAudio

};

})();