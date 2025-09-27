precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D velocityMap;
uniform sampler2D flowMap;

uniform vec2 uSize;

#include ./util.glsl

void main() {
    vec2 delta = 3.0 / uSize;

    vec2 velocity = unpackField(texture2D(velocityMap, vUv));
    vec2 velocity_left = unpackField(texture2D(velocityMap, vUv + delta * vec2(-1, 0)));
    vec2 velocity_right = unpackField(texture2D(velocityMap, vUv + delta * vec2(1, 0)));
    vec2 velocity_bottom = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, -1)));
    vec2 velocity_top = unpackField(texture2D(velocityMap, vUv + delta * vec2(0, 1)));

    vec2 flow = unpackField(texture2D(flowMap, vUv));

    float center = texture2D(pressureMap, vUv).a;
    float right = texture2D(pressureMap, vUv + delta * vec2(1, 0)).a;
    float left = texture2D(pressureMap, vUv + delta * vec2(-1, 0)).a;
    float top = texture2D(pressureMap, vUv + delta * vec2(0, 1)).a;
    float bottom = texture2D(pressureMap, vUv + delta * vec2(0, -1)).a;
    vec2 gradient = vec2(right - left, top - bottom);

    vec2 acceleration = -gradient / (center + 0.1) * 1.0;

    // surface tension?
    float normalization_factor = sqrt(gradient.x * gradient.x + gradient.y * gradient.y + 1.0);
    vec2 surface_tension = (gradient / normalization_factor) * (center + 1.0) * 1.0;

    velocity = velocity * 0.6 + (velocity_left + velocity_right + velocity_bottom + velocity_top) * 0.1;
    velocity = velocity * 0.9999 + acceleration + flow;

    gl_FragColor = packField(velocity);
}