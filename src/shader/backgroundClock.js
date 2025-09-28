import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './backgroundClock.frag'
const shader = createShader(vertex, fragment, {
    uSize: { value: [0, 0] },
    clockHands: { value: [0, 0, 0] },
})

export default function (target) {
    const now = new Date()
    shader(target, {
        uSize: [target.width, target.height],
        clockHands: [
            now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 60 / 60,
            now.getMinutes() + now.getSeconds() / 60 + now.getMilliseconds() / 1000 / 60,
            now.getSeconds() + now.getMilliseconds() / 1000
        ]
    })
}
