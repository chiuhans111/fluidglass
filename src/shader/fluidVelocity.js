import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './fluidVelocity.frag'

const shader = createShader(
    vertex, fragment, {
    pressureMap: { value: 0 },
    velocityMap: { value: 0 },
    flowMap: { value: 0 },
    uSize: { value: [0, 0] }
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} pressureMap 
 * @param {Texture} velocityMap 
 * @param {Texture} flowMap 
 */
export default function (target, pressureMap, velocityMap, flowMap) {
    shader(target, {
        pressureMap, velocityMap, flowMap,
        uSize: [target.width, target.height]
    })
}