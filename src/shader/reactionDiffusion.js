import { RenderTarget, Texture } from "ogl";
import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './reactionDiffusion.frag'
import { getUrlParam } from "@/getUrlParam";

const FLAG_feed = getUrlParam("feed", 0.0540, Number);
const FLAG_kill = getUrlParam("kill", 0.0616, Number);

console.log(FLAG_feed)

const shader = createShader(
    vertex, fragment, {
    pressureMap: { value: 0 },
    maskTexture: { value: 0 },
    uSize: { value: [0, 0] },
    feed0: { value: FLAG_feed },
    kill0: { value: FLAG_kill },
})

/**
 * Get velocity from pressure map
 * @param {RenderTarget} target 
 * @param {Texture} pressureMap 
 */
export default function (target, pressureMap, maskTexture) {
    shader(target, {
        pressureMap, maskTexture,
        uSize: [target.width, target.height]
    })
}