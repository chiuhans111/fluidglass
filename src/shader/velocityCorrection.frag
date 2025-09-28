precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D velocityMap;

uniform vec2 uSize;

#include ./util.glsl

void main() {
    vec2 delta = 4.0 / uSize;

    float center = unpackFloat(texture2D(pressureMap, vUv).rg);
    float left = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(-1, 0)).rg);
    float right = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(1, 0)).rg);
    float bottom = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(0, -1)).rg);
    float top = unpackFloat(texture2D(pressureMap, vUv + delta * vec2(0, 1)).rg);

    vec2 gradient = vec2(right - left, top - bottom);

    vec2 velocity = unpackField(texture2D(velocityMap, vUv)) + gradient * 2.0;

    gl_FragColor = packField(velocity);
}