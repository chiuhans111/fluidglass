import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './advection.frag'

const shader = createShader(
    vertex, fragment, {
    inputMap: { value: 0 },
    velocityMap: { value: 0 },
    uSize: { value: [0, 0] }
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} pressureMap 
 */
export default function (target, inputMap, velocityMap) {
    shader(target, {
        inputMap, velocityMap,
        uSize: [target.width, target.height]
    })
}