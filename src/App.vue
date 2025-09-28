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

/**@type {HTMLElement} */
let appRoot;

const renderTargets = [];
const renderTargets_delayed_set_size = [];

function createRenderTarget(delayed_set_size = false) {
  const target = new RenderTarget(gl, {
    width: 512,
    height: 512,
    type: gl.HALF_FLOAT,
    format: gl.RGBA,
    internalFormat: gl.RGBA16F,
    depth: false,
    wrapS: gl.REPEAT,
    wrapT: gl.REPEAT,
  });
  if (delayed_set_size) {
    renderTargets_delayed_set_size.push(target);
  } else {
    renderTargets.push(target);
  }
  return target;
}

async function initOGL() {
  appRoot = document.getElementById("ogl-canvas-root");
  appRoot.appendChild(gl.canvas);
  let set_size_needed = true;
  let pressure = createRenderTarget();
  let pressure_temp = createRenderTarget(true);
  let velocity = createRenderTarget();
  let velocity_temp = createRenderTarget(true);

  const flowmap = new Flowmap(gl, {
    size: 512,
    falloff: 0.1,
    alpha: 0.01,
    dissipation: 0.5,
  });

  // Listeners
  function resize() {
    const rect = appRoot.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    set_size_needed = true;
  }
  window.addEventListener("resize", resize);

  /**
   * @param {MouseEvent} e
   */
  function mousemove(e) {
    const rect = appRoot.getBoundingClientRect();
    flowmap.mouse.set(
      (e.x - rect.left) / rect.width,
      (rect.height - e.y) / rect.height
    );
    flowmap.velocity.set(e.movementX, e.movementY);
  }

  window.addEventListener("mousemove", mousemove);
  resize();
  // Main initialization
  initializePressure(pressure);

  let temp = null;
  // Rendering
  function update(t) {
    requestAnimationFrame(update);
    flowmap.update();

    if (set_size_needed) {
      set_size_needed = false;
      displayTexture(pressure_temp, pressure.texture, false);
      displayTexture(velocity_temp, velocity.texture, false);

      for (let target of renderTargets)
        target.setSize(renderer.width, renderer.height);

      displayTexture(pressure, pressure_temp.texture, false);
      displayTexture(velocity, velocity_temp.texture, false);

      for (let target of renderTargets_delayed_set_size)
        target.setSize(renderer.width, renderer.height);
    }

    // displayTexture(null, flowmap.mask.read.texture);
    // render pipeline
    // uvTexture(velocity);

    fluidVelocity(
      velocity_temp,
      pressure.texture,
      velocity.texture,
      flowmap.mask.read.texture
    );

    for (let i = 0; i < 10; i++) {
      velocityToPresure(pressure_temp, velocity_temp.texture);
      velocityCorrection(
        velocity,
        pressure_temp.texture,
        velocity_temp.texture
      );
      advection(velocity_temp, velocity.texture, velocity.texture);
      advection(pressure_temp, pressure.texture, velocity.texture);
      reactionDiffusion(pressure, pressure_temp.texture);
      reactionDiffusion(pressure_temp, pressure.texture);
      reactionDiffusion(pressure, pressure_temp.texture);
    }
    displayTexture(velocity, velocity_temp.texture, false);

    displayTexture(null, pressure.texture, true);
    // displayTexture(null, velocity.texture, false);
  }
  requestAnimationFrame(update);
}

function destroy() {
  window.removeEventListener("resize", resize);
  appRoot.removeChild(gl.canvas);
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
