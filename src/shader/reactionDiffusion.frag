precision highp float;

varying vec2 vUv;

uniform sampler2D pressureMap;
uniform sampler2D maskTexture;

uniform float feed0; // 0.0540
uniform float kill0; // 0.0616

uniform vec2 uSize;
#include ./util.glsl

// good reference:
// https://jasonwebb.github.io/reaction-diffusion-playground/app.html

void main() {
    vec2 delta = 1.0 / uSize;

    vec4 center = texture2D(pressureMap, vUv);

    vec4 maskInput = texture2D(maskTexture, vUv);

    vec4 left = texture2D(pressureMap, vUv + delta * vec2(-1, 0));
    vec4 right = texture2D(pressureMap, vUv + delta * vec2(1, 0));
    vec4 bottom = texture2D(pressureMap, vUv + delta * vec2(0, -1));
    vec4 top = texture2D(pressureMap, vUv + delta * vec2(0, 1));

    vec4 corner1 = texture2D(pressureMap, vUv + delta * vec2(-1, 1));
    vec4 corner2 = texture2D(pressureMap, vUv + delta * vec2(1, 1));
    vec4 corner3 = texture2D(pressureMap, vUv + delta * vec2(-1, -1));
    vec4 corner4 = texture2D(pressureMap, vUv + delta * vec2(1, -1));

    vec4 laplacian = (left + right + bottom + top) * 0.2 + (corner1 + corner2 + corner3 + corner4) * 0.05 - center;

    float feed = feed0 + (vUv.x - 0.5) * 0.02;
    float kill_compensated = kill0 - 7.0 * ((feed - 0.065) * (feed - 0.065) - (feed0 - 0.065) * (feed0 - 0.065));

    float r = length((vUv - 0.5) * uSize) / min(uSize.x, uSize.y);
    float kill = kill_compensated + abs(vUv.y - 0.5) * 0.04;

    float mask = maskInput.r * 0.1;

    vec3 diffusion = vec3(0.4, 0.1, 0.1) * 8.0;
    vec3 reaction = vec3(-1.0, 1.0, 1.0);
    vec3 balance = vec3(1.0, mask, mask);
    vec3 damping = vec3(feed, feed + kill, feed + kill);
    vec3 density = vec3(1.0, 0.0, 0.0);

    vec3 change = diffusion * laplacian.xyz + reaction * center.x * center.y * center.z + (balance - center.xyz) * damping;

    vec3 result = center.xyz + change * 0.3;
    gl_FragColor.xyz = result.xyz;
    gl_FragColor.a = 1.0 - dot(density, result);

}