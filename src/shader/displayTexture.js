import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './displayTexture.frag'

const shader = createShader(
    vertex, fragment, {
    textureMap: { value: 0 },
    unpack: { value: false }
})

export default function (target, textureMap, unpack=false) {
    shader(target, { textureMap, unpack })
}