precision highp float;

varying vec2 vUv;

uniform sampler2D velocityMap;

uniform vec2 uSize;

#include ./util.glsl

void main() {
    vec2 delta = 4.0 / uSize;

    vec2 center = unpackField(texture2D(velocityMap, vUv));
    vec2 left = unpackField(texture2D(velocityMap, vUv + delta * vec2(-1, 0)));
    vec2 right = unpackField(texture2D(velocityMap, vUv + delta * vec2(1, 0)));
    vec2 bottom = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, -1)));
    vec2 top = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, 1)));

    float divergent = (right.x - left.x) + (top.y - bottom.y);

    gl_FragColor.rg = packFloat(divergent / 4.0 * 0.5 + 0.5);
}