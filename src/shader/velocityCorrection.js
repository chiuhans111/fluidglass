import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './velocityCorrection.frag'

const shader = createShader(
    vertex, fragment, {
    pressureMap: { value: 0 },
    velocityMap: { value: 0 },
    uSize: { value: [0, 0] }
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} pressureMap 
 * @param {Texture} velocityMap 
 */
export default function (target, pressureMap, velocityMap) {
    shader(target, {
        pressureMap, velocityMap,
        uSize: [target.width, target.height]
    })
}