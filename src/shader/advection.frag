precision highp float;

varying vec2 vUv;

uniform sampler2D inputMap;
uniform sampler2D velocityMap;

uniform vec2 uSize;
#include ./util.glsl

void main() {
    vec2 delta = 1.0 / uSize;

    vec2 velocity = unpackField(texture2D(velocityMap, vUv));
    // vec2 velocity_right = unpackField(texture2D(velocityMap, vUv + delta * vec2(1, 0)));
    // vec2 velocity_top = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, 1)));
    // vec2 velocity_bottom = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, -1)));
    // vec2 velocity_left = unpackField(texture2D(velocityMap, vUv + delta * vec2(-1, 0)));

    // vec2 displacement = -(velocity.x + vec2(velocity_right.x, velocity_top.y)) * 0.5;
    vec2 displacement = -velocity;
    float factor = 0.9;
    vec4 displaced = texture2D(inputMap, vUv + displacement * delta * 0.1);
    gl_FragColor = texture2D(inputMap, vUv) * (1.0 - factor) + displaced * factor;

}