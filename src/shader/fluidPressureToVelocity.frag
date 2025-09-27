precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;

uniform vec2 uSize;

#include ./util.glsl

void main() {
    vec2 velocity = vec2(0.0);
    vec2 delta = 10.0 / uSize;

    float center = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(1, 0)).rg);
    float left = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(-1, 0)).rg);
    float right = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(1, 0)).rg);
    float bottom = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(0, -1)).rg);
    float top = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(0, 1)).rg);

    vec2 gradient = vec2(right-left, top-bottom) / 2.0 / delta;
    
    gl_FragColor = packField(vec2(right-left)*20.0);
}