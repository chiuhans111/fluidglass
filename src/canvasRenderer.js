import { RenderTarget, Texture } from "ogl";

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

let texture = undefined
// document.body.append(canvas)
/**
 * 
 * @param {RenderTarget} target 
 * @param {(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void} callback
 * @param {Texture} [texture] - Optional texture to reuse
 * @returns {Texture}
 */
export default function (target, callback) {
    canvas.width = target.width
    canvas.height = target.height
    callback(canvas, ctx)
    if (!texture) {
        texture = new Texture(target.gl)
        texture.image = canvas
    }
    texture.needsUpdate = true // Ensure ogl updates the texture
    return texture
}