precision highp float;

varying vec2 vUv;

uniform vec2 uSize;
uniform vec3 clockHands;

#include ./util.glsl

vec3 drawCircle(vec2 coord, float t) {
    float radius = max(uSize.x, uSize.y) * 0.5;
    vec2 origin = vec2(cos(t * PI * 2.0), sin(t * PI * 2.0)) * radius;
    coord -= origin;
    float r = length(coord) / radius;
    float f = 1.0 / (abs(r - 1.0) * 200.0 + 1.0);

    vec2 displacement = -coord * f * step(r, 1.0);
    f = f + step(r, 1.0) * 0.05 * (r + 1.0);

    return vec3(displacement, f);
}

void main() {
    vec3 final_color = vec3(0);

    for(int i = 0; i < 1; i++) {
        for(int j = 0; j < 1; j++) {
            vec2 coord = (vUv - 0.5) * uSize + vec2(i, j) / 2.0;
            float radius = length(coord) / min(uSize.x, uSize.y);
            float clock = atan(coord.y, coord.x);
            float tick = fract(0.25 - clock / PI / 2.0);
            // vec3 hands = 1.0 / (abs(fract((tick - clockHands / vec3(12.0, 60.0, 60.0)) + 0.5) - 0.5) * 100.0 + 1.0);

            vec3 circle3 = drawCircle(coord, clockHands.z / 60.0);
            coord += circle3.xy * 0.1;
            vec3 circle2 = drawCircle(coord, clockHands.y / 60.0);
            coord += circle2.xy * 0.1;
            vec3 circle1 = drawCircle(coord, clockHands.x / 12.0);

            vec3 color = vec3(0.0);
            color = mix(color, vec3(0.9686274509803922, 0.49411764705882355, 0.17647058823529413), circle1.z);
            color = mix(color, vec3(00.19607843137254902, 0.21568627450980393, 0.2901960784313726), circle2.z);
            color = mix(color, vec3(0.9607843137254902, 0.9607843137254902, 0.9607843137254902), circle3.z);

            final_color = final_color + color;

        }
    }

    // final_color *= 0.6;
    // final_color.r = pow(final_color.r, 2.2);
    // final_color.g = pow(final_color.g, 2.2);
    // final_color.b = pow(final_color.b, 2.2);

    gl_FragColor.rgb = final_color;
    gl_FragColor.a = 1.0;
}