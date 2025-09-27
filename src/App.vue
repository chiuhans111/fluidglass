<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { RenderTarget } from "ogl";
import { renderer, gl } from "./createShader";
import uvTexture from "./shader/uvTexture";
import displayTexture from "./shader/displayTexture";
import fluidPressureToVelocity from "./shader/fluidPressureToVelocity";
import initializePressure from "./shader/initializePressure";

let appRoot;

const renderTargets = [renderer];

function createRenderTarget() {
  const texture = new RenderTarget(gl, {
    width: 512,
    height: 512,
    type: gl.UNSIGNED_BYTE,
  });
  renderTargets.push(texture);
  return texture;
}

async function initOGL() {
  appRoot = document.getElementById("ogl-canvas-root");
  appRoot.appendChild(gl.canvas);

  const pressure = createRenderTarget();
  const velocity = createRenderTarget();

  // Resize listener
  function resize() {
    const rect = appRoot.getBoundingClientRect();
    for (let target of renderTargets) target.setSize(rect.width, rect.height);
  }
  window.addEventListener("resize", resize);
  resize();
  // Main initialization

  // Rendering
  function update(t) {
    requestAnimationFrame(update);
    // render pipeline
    // uvTexture(velocity);
    initializePressure(pressure);
    fluidPressureToVelocity(velocity, pressure.texture);
    // displayTexture(null, pressure.texture, true);
    displayTexture(null, velocity.texture, true);
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

<style scoped>
#ogl-canvas-root {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
