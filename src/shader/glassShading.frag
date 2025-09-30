precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D backgroundMap;
uniform vec3 glassColor;
uniform float shadowFactor;
uniform float brightFactor;

uniform vec2 parallax;

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
    float cos_value22 = n2 * n2 - sin_value * sin_value;
    if(cos_value22 < 0.0)
        return my_reflection(normal, incoming);
    float cos_value2 = sqrt(cos_value22);
    vec3 refracted = cos_value2 * normal + sin_vec;
    return refracted / length(refracted);
}

float thickness(vec4 p) {
    float t = smoothstep(0.45, 0.95, p.a);
    return sqrt(t);
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

            vec2 gradient = vec2(thickness(right) - thickness(left), thickness(top) - thickness(bottom)) * 0.7;

            vec3 normal = vec3(-gradient.x, -gradient.y, 1.0);
            normal = normal / length(normal);

            vec3 incoming = vec3(parallax, 1);
            incoming = incoming / length(incoming);

            float n2 = 1.33;

            vec3 refracted = my_refraction(normal, incoming, n2);
            refracted = my_refraction(normal * vec3(-1, -1, 1.0), refracted, 1.0 / n2);
            vec3 reflected = my_reflection(normal, incoming);

            vec2 displacement = refracted.xy / refracted.z - parallax;

            float r_r = texture2D(backgroundMap, uv + displacement * 1.0).r;
            float r_g = texture2D(backgroundMap, uv + displacement * 1.05).g;
            float r_b = texture2D(backgroundMap, uv + displacement * 1.1).b;

            vec4 background_T = vec4(r_r, r_g, r_b, 1.0);

            vec3 incoming_clamped = incoming;
            incoming_clamped.z = clamp(incoming_clamped.z, 0.8, 1.0);
            incoming_clamped.xy /= max(length(incoming_clamped.xy), 0.0001);
            incoming_clamped.xy *= sqrt(1.0 - incoming_clamped.z);
            vec3 reflected_clamped = my_reflection(normal, incoming_clamped);

            float light = abs(dot(reflected_clamped, vec3(-0.1, 0.6, 0.01)));
            light = step(0.1, light) * light * 8.0;
            // float light = abs(dot(reflected_clamped, vec3(0.2, 0.2, -1.0)));
            // light = max(step(0.7, light) * (light - 0.7), 0.0) * 50.0;

            vec4 background_R = vec4(vec3(light), 0) * vec4(glassColor, 1.0);

            // float R = pow(1.0 - dot(incoming, normal), 5.0) * thickness(center);
            float R = pow(1.0 - normal.z, 0.5) * smoothstep(0.0, 0.01, thickness(center));

            float t = thickness(center);

            vec4 color = background_R * R + background_T * (1.0 - R) * (1.0 - shadowFactor * t) + (t * brightFactor);
            color.rgb = color.rgb * mix(vec3(1), glassColor, t);
            final_color = final_color + color * 0.25;

            // final_color.rgb = vec3(light);
            // final_color.a = 1.0;
        }
    }

    gl_FragColor = final_color;
    // gl_FragColor = vec4(thickness(cp.a,center));
    // gl_FragColor = vec4(R);
}