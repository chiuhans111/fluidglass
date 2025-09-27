precision highp float;

varying vec2 vUv;

void main() {
    gl_FragColor.rg = vUv.xy;
    gl_FragColor.b = 0.5;
    gl_FragColor.a = 1.0;
}