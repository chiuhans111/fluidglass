precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D backgroundMap;

uniform vec2 uSize;
#include ./util.glsl

vec3 my_reflection(vec3 normal, vec3 incoming) {
    float cos_value = dot(incoming, normal);
    vec3 cos_vec = cos_value * normal;
    vec3 reflected = incoming - cos_vec * 2.0;
    return reflected / length(reflected);
}

vec3 my_refraction(vec3 normal, vec3 incoming, float n2) {
    float cos_value = dot(incoming, normal);
    vec3 cos_vec = cos_value * normal;
    vec3 sin_vec = incoming - cos_vec;
    float sin_value = length(sin_vec);
    float cos_value22 = n2 * n2 - sin_value;
    if(cos_value22 < 0.0)
        return my_reflection(normal, incoming);
    float cos_value2 = sqrt(cos_value22);
    vec3 refracted = cos_value2 * normal + sin_vec;
    return refracted / length(refracted);
}

float thickness(vec4 p) {
    return smoothstep(0.4, 0.95, p.a);
}

void main() {
    vec2 delta = 1.0 / uSize;

    vec4 final_color = vec4(0.0);

    for(int si = 0; si < 2; si++) {
        for(int sj = 0; sj < 2; sj++) {

            vec2 uv = vUv + delta * vec2(si, sj) * 0.5;

            vec4 center = texture2D(pressureMap, uv);
            vec4 left = texture2D(pressureMap, uv + delta * vec2(-1, 0));
            vec4 right = texture2D(pressureMap, uv + delta * vec2(1, 0));
            vec4 bottom = texture2D(pressureMap, uv + delta * vec2(0, -1));
            vec4 top = texture2D(pressureMap, uv + delta * vec2(0, 1));

            vec2 gradient = vec2(thickness(right) - thickness(left), thickness(top) - thickness(bottom));

            vec3 normal = vec3(-gradient.x, -gradient.y, 1.0);
            normal = normal / length(normal);

            vec3 incoming = vec3(0, 0, 1);

            float n2 = 1.5;

            vec3 refracted = my_refraction(normal, incoming, n2);
            refracted = my_refraction(normal * vec3(-1, -1, 1.0), refracted, 1.0 / n2);
            vec3 reflected = my_reflection(normal, incoming);

            float r_r = texture2D(backgroundMap, uv + refracted.xy / refracted.z * 1.0).r;
            float r_g = texture2D(backgroundMap, uv + refracted.xy / refracted.z * 1.05).g;
            float r_b = texture2D(backgroundMap, uv + refracted.xy / refracted.z * 1.1).b;

            vec4 background_T = vec4(r_r, r_g, r_b, 1.0);

            float light = abs(dot(reflected, vec3(-0.1, 0.6, 0.01)));
            light = step(0.1, light) * light * 30.0;
            vec4 background_R = vec4(vec3(light), 0);

            float R = pow(1.0 - dot(incoming, normal), 0.5) * thickness(center);

            float shadow = thickness(texture2D(pressureMap, vUv + delta * vec2(0, 0)));
            vec4 color = background_R * R + background_T * (1.0 - R) + ( shadow * 0.05);

            final_color = final_color + color * 0.25;
        }
    }

    gl_FragColor = final_color;
    // gl_FragColor = vec4(thickness(cp.a,center));
    // gl_FragColor = vec4(R);
}