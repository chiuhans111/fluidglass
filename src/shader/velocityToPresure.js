import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './velocityToPressure.frag'

const shader = createShader(
    vertex, fragment, {
    velocityMap: { value: 0 },
    uSize: { value: [0, 0] }
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} velocityMap 
 */
export default function (target, velocityMap) {
    shader(target, {
        velocityMap,
        uSize: [target.width, target.height]
    })
}