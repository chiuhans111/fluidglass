import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './reactionDiffusion.frag'

const shader = createShader(
    vertex, fragment, {
    pressureMap: { value: 0 },
    uSize: { value: [0, 0] }
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} pressureMap 
 */
export default function (target, pressureMap) {
    shader(target, {
        pressureMap,
        uSize: [target.width, target.height]
    })
}