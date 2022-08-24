<script setup lang="ts">
import "@babylonjs/loaders";
import { ArcRotateCamera, Engine, Scene, Vector3 } from "@babylonjs/core";
import { drawBlogTooltip } from "~/babylon/tooltip";
import { drawIsland, drawWaterIsland } from "~/babylon/island";
import { drawMarill } from "~/babylon/marill";
import { drawPikachu } from "~/babylon/Pikachu";

import * as GUI from "@babylonjs/gui";

const islandRef = ref<HTMLCanvasElement>(null);

onMounted(() => {
  const engine = new Engine(islandRef.value, true);

  const createScene = () => new Scene(engine);
  const scene = createScene();
  engine.runRenderLoop(() => scene.render());

  const camera = new ArcRotateCamera(
    "camera",
    2,
    0.9,
    6,
    new Vector3(0.5, -0.1, -1.2),
    scene
  );
  camera.attachControl(islandRef.value, true);
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 7;
  camera.wheelPrecision = 100;
  camera.useFramingBehavior = true;

  drawIsland(scene);
  drawWaterIsland(scene);
  drawBlogTooltip(scene);
  drawMarill(scene);
  drawPikachu(scene);

  scene.createDefaultEnvironment();
});
</script>
<template>
  <canvas ref="islandRef" class="island" />
</template>

<style lang="scss" scoped>
.island {
  @apply w-screen h-screen fixed;
}
</style>
