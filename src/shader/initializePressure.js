import { createShader } from "../createShader";
import vertex from './default.vert'
import fragment from './initializePressure.frag'
const shader = createShader(vertex, fragment)

export default function (target) {
    shader(target)
}
