import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './glassShading.frag'

const shader = createShader(
    vertex, fragment, {
    pressureMap: { value: 0 },
    backgroundMap: { value: 0 },
    uSize: { value: [0, 0] }
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} pressureMap 
 * @param {Texture} backgroundMap 
 */
export default function (target, pressureMap, backgroundMap) {
    shader(target, {
        pressureMap, backgroundMap,
        uSize: [pressureMap.width, pressureMap.height]
    })
}