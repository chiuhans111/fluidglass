import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './glassShading.frag'
import { getUrlParam, hexToRgb } from "@/getUrlParam";

const FLAG_color = getUrlParam("color", [1, 1, 1], hexToRgb);
const FLAG_shadow = getUrlParam("shadow", 0.05, Number);
const FLAG_bright = getUrlParam("bright", 0.05, Number);

const shader = createShader(
    vertex, fragment, {
    pressureMap: { value: 0 },
    backgroundMap: { value: 0 },
    uSize: { value: [0, 0] },
    glassColor: { value: FLAG_color },
    shadowFactor: { value: FLAG_shadow },
    brightFactor: { value: FLAG_bright },
    parallax: { value: [0, 0] }
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} pressureMap 
 * @param {Texture} backgroundMap 
 */
export default function (target, pressureMap, backgroundMap, parallax) {
    shader(target, {
        pressureMap, backgroundMap, parallax,
        uSize: [pressureMap.width, pressureMap.height]
    })
}