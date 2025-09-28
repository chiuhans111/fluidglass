precision highp float;

varying vec2 vUv;

uniform vec2 uSize;
uniform vec3 clockHands;

#include ./util.glsl

void main() {
    vec3 final_color = vec3(0);

    for(int i = 0; i < 2; i++) {
        for(int j = 0; j < 2; j++) {
            vec2 coord = (vUv - 0.5) * uSize + vec2(float(i) / 2.0, float(j) / 2.0);
            float radius = length(coord) / min(uSize.x, uSize.y);
            float clock = atan(coord.y, coord.x);
            float tick = fract(0.25 - clock / PI / 2.0);
            vec3 hands = 1.0 / (abs(fract((tick - clockHands / vec3(12.0, 60.0, 60.0)) + 0.5) - 0.5) * 100.0 + 1.0 + radius * 3.0);
            vec3 color = vec3(dot(hands, vec3(1.0, 0.6, 0.3)));
            final_color = final_color + color * 0.25;
        }
    }

    gl_FragColor.rgb = final_color;
    gl_FragColor.a = 0.0;
}