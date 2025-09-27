#define PI 3.14159265358979

vec2 packFloat(float v) {
    return vec2(v);

    float s = v * 256.0;
    float v1 = floor(s);
    float v2 = s - v1;
    return vec2((v1 + 0.5) / 256.0, v2);
}

float unpackFloat(vec2 v) {
    return v.x;
    
    return v.x + v.y / 256.0;
}

vec4 packField(vec2 v) {
    // v = clamp((v+1.0)/2.0, 0.0, 1.0);
    // return vec4(packFloat(v.x), packFloat(v.y));
    return v.rgrg;
}

vec2 unpackField(vec4 v) {
    // return vec2(unpackFloat(v.rg) * 2.0 - 1.0, unpackFloat(v.ba) * 2.0 - 1.0);
    // return vec2(unpackFloat(v.rg), unpackFloat(v.ba));
    return v.rg;
}