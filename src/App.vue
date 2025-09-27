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

/**@type {HTMLElement} */
let appRoot;

const renderTargets = [renderer];

function createRenderTarget() {
  const texture = new RenderTarget(gl, {
    width: 512,
    height: 512,
    type: gl.HALF_FLOAT,
    format: gl.RGBA,
    internalFormat: gl.RGBA16F,
    depth: false,
    wrapS: gl.REPEAT,
    wrapT: gl.REPEAT,
  });
  renderTargets.push(texture);
  return texture;
}

async function initOGL() {
  appRoot = document.getElementById("ogl-canvas-root");
  appRoot.appendChild(gl.canvas);

  let pressure = createRenderTarget();
  let pressure_temp = createRenderTarget();
  let velocity = createRenderTarget();
  let velocity_temp = createRenderTarget();

  const flowmap = new Flowmap(gl, {
    size: 256,
    falloff: 0.1,
    alpha: 1,
    dissipation: 0.9,
  });

  // Listeners
  function resize() {
    const rect = appRoot.getBoundingClientRect();
    for (let target of renderTargets) target.setSize(rect.width, rect.height);
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
    flowmap.velocity.set(e.movementX / 50, e.movementY / 50);
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
    // displayTexture(null, flowmap.mask.read.texture);
    // render pipeline
    // uvTexture(velocity);
    for (let i = 0; i < 10; i++) {
      fluidVelocity(
        velocity_temp,
        pressure.texture,
        velocity.texture,
        flowmap.mask.read.texture
      );

      velocityToPresure(pressure_temp, velocity_temp.texture);
      velocityCorrection(
        velocity,
        pressure_temp.texture,
        velocity_temp.texture
      );

      advection(velocity_temp, velocity.texture, velocity.texture);
      advection(pressure_temp, pressure.texture, velocity.texture);

      temp = pressure_temp;
      pressure_temp = pressure;
      pressure = temp;

      temp = velocity_temp;
      velocity_temp = velocity;
      velocity = temp;
    }

    displayTexture(null, pressure.texture, false);
    // displayTexture(null, velocity.texture, true);
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
