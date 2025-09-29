<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Flowmap, RenderTarget } from "ogl";
import { renderer, gl } from "./createShader";
import uvTexture from "./shader/uvTexture";
import displayTexture from "./shader/displayTexture";
import initializePressure from "./shader/initializePressure";
import advection from "./shader/advection";
import velocityToPresure from "./shader/velocityToPresure";
import velocityCorrection from "./shader/velocityCorrection";
import fluidVelocity from "./shader/fluidVelocity";
import reactionDiffusion from "./shader/reactionDiffusion";
import canvasRenderer from "./canvasRenderer";
import glassShading from "./shader/glassShading";
import backgroundClock from "./shader/backgroundClock";
import { getUrlParam } from "./getUrlParam";

import useParallax from "./parallax";

const { parallax } = useParallax();

/**@type {HTMLElement} */
let appRoot;
/**@type {Flowmap} */
let flowmap;

const renderTargets = [];
const renderTargets_delayed_set_size = [];

const FLAG_debug = getUrlParam("debug", null, String);
const FLAG_iteration = getUrlParam("iteration", 10, Number);

function createRenderTarget(delayed_set_size = false) {
  const target = new RenderTarget(gl, {
    width: 512,
    height: 512,
    type: gl.HALF_FLOAT,
    format: gl.RGBA,
    internalFormat: gl.RGBA16F,
    depth: false,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE,
    // wrapT: gl.CLAMP_TO_EDGE,
    // wrapT: gl.REPEAT,
  });
  if (delayed_set_size) {
    renderTargets_delayed_set_size.push(target);
  } else {
    renderTargets.push(target);
  }
  return target;
}

let set_size_needed = true;
let simulation_size = [512, 512];

// Listeners
function resize() {
  const rect = appRoot.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  set_size_needed = true;
}

function renderForeground(canvas, ctx) {
  ctx.fillStyle = "red";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const now = new Date();
  if (canvas.width > canvas.height * 1.5) {
    const size = canvas.width / 8;
    ctx.font = Math.round(size) + "px Roboto Mono";

    const timestr = [
      now.getHours().toString().padStart(2, "0"),
      now.getMinutes().toString().padStart(2, "0"),
      now.getSeconds().toString().padStart(2, "0"),
      // ].join(":");
    ].join(now.getMilliseconds() < 500 ? ":" : " ");
    ctx.fillText(timestr, canvas.width / 2, canvas.height / 2);
  } else {
    const size = canvas.height / 4;
    ctx.font = Math.round(size) + "px Roboto Mono";
    ctx.fillText(
      now.getHours().toString().padStart(2, "0"),
      canvas.width / 2,
      canvas.height / 2 - size
    );
    ctx.fillText(
      now.getMinutes().toString().padStart(2, "0"),
      canvas.width / 2,
      canvas.height / 2
    );
    ctx.fillText(
      now.getSeconds().toString().padStart(2, "0"),
      canvas.width / 2,
      canvas.height / 2 + size
    );
  }
}

/**
 * @param {MouseEvent} e
 */
function mousemove(e) {
  const rect = appRoot.getBoundingClientRect();
  flowmap.mouse.set((e.x - 0) / rect.width, (rect.bottom - e.y) / rect.height);
  flowmap.velocity.set(
    (e.movementX / rect.width) * simulation_size[0],
    (e.movementY / rect.width) * simulation_size[1]
  );
}

function touchmove(e) {
  if (!e.touches || e.touches.length === 0) return;
  const touch = e.touches[0];
  const rect = appRoot.getBoundingClientRect();
  e.preventDefault();
  flowmap.mouse.set(
    (touch.clientX - 0) / rect.width,
    (rect.bottom - touch.clientY) / rect.height
  );
  // Approximate movement by comparing with previous position
  if (!touchmove.prev) touchmove.prev = { x: touch.clientX, y: touch.clientY };
  flowmap.velocity.set(
    ((touch.clientX - touchmove.prev.x) / rect.width) * simulation_size[0],
    ((touch.clientY - touchmove.prev.y) / rect.width) * simulation_size[1]
  );
  touchmove.prev.x = touch.clientX;
  touchmove.prev.y = touch.clientY;
}

// Main setup

let alive = true;
async function initOGL() {
  appRoot = document.getElementById("ogl-canvas-root");
  appRoot.appendChild(gl.canvas);
  renderer.setSize(window.innerWidth, window.innerHeight);
  let pressure = createRenderTarget();
  let background = createRenderTarget();
  let pressure_temp = createRenderTarget(true);
  let velocity = createRenderTarget();
  let velocity_temp = createRenderTarget(true);

  flowmap = new Flowmap(gl, {
    size: 512,
    falloff: 0.12,
    alpha: 0.8,
    dissipation: 0.7,
  });

  // register listener
  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("touchmove", touchmove, { passive: false });
  window.addEventListener("mousemove", mousemove);

  // Main initialization
  initializePressure(pressure);

  // Rendering
  function update(t) {
    if (alive) requestAnimationFrame(update);
    flowmap.update();
    flowmap.velocity.set(0, 0);
    // displayTexture(null, flowmap.mask);
    // return

    if (set_size_needed) {
      set_size_needed = false;
      displayTexture(pressure_temp, pressure.texture, false);
      displayTexture(velocity_temp, velocity.texture, false);

      const scale = Math.max(
        0.4,
        Math.min(
          0.8,
          (1024 / Math.min(renderer.width, renderer.height)) *
            window.devicePixelRatio
        )
      );

      const width = Math.round((renderer.width * scale) / 4) * 4;
      const height = Math.round((renderer.height * scale) / 4) * 4;

      simulation_size = [width, height];

      for (let target of renderTargets) target.setSize(width, height);

      displayTexture(pressure, pressure_temp.texture, false);
      displayTexture(velocity, velocity_temp.texture, false);

      for (let target of renderTargets_delayed_set_size)
        target.setSize(width, height);
    }

    fluidVelocity(
      velocity_temp,
      pressure.texture,
      velocity.texture,
      flowmap.mask.read.texture
    );

    const maskTexture = canvasRenderer(renderer, renderForeground);

    for (let i = 0; i < FLAG_iteration; i++) {
      velocityToPresure(pressure_temp, velocity_temp.texture);
      velocityCorrection(
        velocity,
        pressure_temp.texture,
        velocity_temp.texture
      );

      advection(velocity_temp, velocity.texture, velocity.texture);
      advection(pressure_temp, pressure.texture, velocity.texture);

      reactionDiffusion(pressure, pressure_temp.texture, maskTexture);
    }

    displayTexture(velocity, velocity_temp.texture, false);
    backgroundClock(background, [parallax.value.x, parallax.value.y]);
    glassShading(renderer, pressure.texture, background.texture, [
      parallax.value.x,
      parallax.value.y,
    ]);

    if (FLAG_debug == "velocity") {
      displayTexture(renderer, velocity.texture, false);
    } else if (FLAG_debug == "pressure") {
      displayTexture(renderer, pressure.texture, true);
    } else if (FLAG_debug == "background") {
      displayTexture(renderer, background.texture, false);
    } else if (FLAG_debug == "flowmap") {
      displayTexture(null, flowmap.mask.read.texture, false);
    }
  }
  requestAnimationFrame(update);
}

function destroy() {
  // remove listener
  window.removeEventListener("resize", resize);
  window.removeEventListener("touchmove", touchmove);
  window.removeEventListener("mousemove", mousemove);
  appRoot.removeChild(gl.canvas);
  alive = false;
}

onMounted(() => {
  initOGL();
});

onBeforeUnmount(() => {
  destroy();
});
</script>

<template>
  <div id="ogl-canvas-root"></div>
</template>

<style scoped lang="scss">
#ogl-canvas-root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
