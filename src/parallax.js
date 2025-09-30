import { Euler, Mat3, Quat, Vec3 } from 'ogl';
import { onMounted, onUnmounted, ref } from 'vue';

const parallax = ref({ x: 0, y: 0 })

let resetOrientation = 1.0
const naturalQuat = new Quat();
const quat = new Quat();
const matNatural = new Mat3();
const mat = new Mat3();

let hasOrientation = false

function handleOrientation(event) {
    const absolute = event.absolute;
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    if (gamma) {
        if (!hasOrientation) {
            resetOrientation = 1.0
            hasOrientation = true
        }
    }

    // Convert Euler angles (alpha, beta, gamma) to radians
    const _deg2rad = Math.PI / 180;
    const a = alpha ? alpha * _deg2rad : 0; // Z axis
    const b = beta ? beta * _deg2rad : 0;   // X axis
    const g = gamma ? gamma * _deg2rad : 0; // Y axis


    quat.fromEuler(new Euler(a, b, g, "XYZ"));
    // Do stuff with the new orientation data
}


let motion = {
    x: 0,
    y: 0
}

/**
 * @param {MouseEvent} e 
 */
function mousemove(e) {
    motion.x += e.movementX * 0.001
    motion.y -= e.movementY * 0.001
}

let alive = true
function updateParallax() {

    if (hasOrientation) {

        naturalQuat.slerp(quat, resetOrientation)
        resetOrientation = 0.01

        matNatural.fromQuaternion(naturalQuat);
        mat.fromQuaternion(quat);

        matNatural.inverse().multiply(mat)

        // console.log(matNatural[0], matNatural[1], matNatural[2])
        // console.log(matNatural[3], matNatural[4], matNatural[5])
        // console.log(matNatural[6], matNatural[7], matNatural[8])

        parallax.value.x = matNatural[1] / Math.max(matNatural[0], 0.1)
        parallax.value.y = matNatural[2] / Math.max(matNatural[0], 0.1)


        console.log(parallax.value)
    }


    if (alive)
        requestAnimationFrame(updateParallax)

    parallax.value.x += motion.x * 0.1
    parallax.value.y += motion.y * 0.1
    parallax.value.x *= 0.99
    parallax.value.y *= 0.99
    motion.x *= 0.8
    motion.y *= 0.8
}



export default function useParallax() {
    onMounted(() => {
        window.addEventListener('deviceorientation', handleOrientation);
        window.addEventListener('mousemove', mousemove);
        updateParallax();
    });

    onUnmounted(() => {
        alive = false;
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('mousemove', mousemove);
    });



    return { parallax }
}