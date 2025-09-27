precision highp float;

uniform sampler2D textureMap;
uniform bool showAlpha;

varying vec2 vUv;

#include ./util.glsl

void main() {
    gl_FragColor = texture2D(textureMap, vUv);
    gl_FragColor = gl_FragColor * gl_FragColor.a;
    if(showAlpha) {
        gl_FragColor.rgb = gl_FragColor.aaa;
    }
}