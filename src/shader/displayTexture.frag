precision highp float;

uniform sampler2D textureMap;


uniform bool unpack;

varying vec2 vUv;

#include ./util.glsl

void main() {
    
    gl_FragColor = texture2D(textureMap, vUv);

    if (unpack){
        gl_FragColor.rg = unpackField(gl_FragColor)*0.5+0.5;
        gl_FragColor.b = 0.5;
        gl_FragColor.a = 1.0;
    }
}