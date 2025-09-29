import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './backgroundClock.frag'
import { getUrlParam, hexToRgb } from "@/getUrlParam";

const FLAG_bgcolor = getUrlParam("bgcolor", [0, 0, 0], hexToRgb)

const FLAG_color1 = getUrlParam("color1", [0.9686274509803922, 0.49411764705882355, 0.17647058823529413], hexToRgb)
const FLAG_color2 = getUrlParam("color2", [0.19607843137254902, 0.21568627450980393, 0.2901960784313726], hexToRgb)
const FLAG_color3 = getUrlParam("color3", [0.9607843137254902, 0.9607843137254902, 0.9607843137254902], hexToRgb)

const shader = createShader(vertex, fragment, {
    uSize: { value: [0, 0] },
    parallax: { value: [0, 0] },
    clockHands: { value: [0, 0, 0] },
    bgcolor: { value: FLAG_bgcolor },
    circlecolor1: { value: FLAG_color1 },
    circlecolor2: { value: FLAG_color2 },
    circlecolor3: { value: FLAG_color3 }
})

export default function (target, parallax) {
    const now = new Date()
    shader(target, {
        parallax,
        uSize: [target.width, target.height],
        clockHands: [
            now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 60 / 60,
            now.getMinutes() + now.getSeconds() / 60 + now.getMilliseconds() / 1000 / 60,
            now.getSeconds() + now.getMilliseconds() / 1000
        ]
    })
}
