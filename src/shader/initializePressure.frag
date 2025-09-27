precision highp float;

varying vec2 vUv;

#include ./util.glsl

void main() {
    float pressure = (sin(vUv.x*PI*2.0) * sin(vUv.y*PI*2.0))*0.5+0.5;
    gl_FragColor.rg = packFloat(pressure);
    gl_FragColor.b = 0.5;
    gl_FragColor.a = 0.5;
}