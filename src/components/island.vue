<script setup lang="ts">
import "@babylonjs/loaders";
import {
  ArcRotateCamera,
  Engine,
  Mesh,
  MeshBuilder,
  PointLight,
  Scene,
  SceneLoader,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

import * as GUI from "@babylonjs/gui";

const islandRef = ref<HTMLCanvasElement>(null);

const drawIsland = (scene: Scene, camera: ArcRotateCamera) => {
  const Island = SceneLoader.ImportMesh(
    "",
    import.meta.env.BASE_URL + "assets/island/fantasy_eco_city/",
    "scene.gltf",
    scene
  );
};

const drawBlogTooltip = (scene) => {
  const drawFrontText = (mesh: Mesh) => {
    const plane = Mesh.CreatePlane("plane", 2);
    plane.parent = mesh;
    plane.position = new Vector3(0.01, 1.4, -0.05);

    const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

    const button = GUI.Button.CreateSimpleButton("btn", "Blog");
    button.width = 0.15;
    button.height = 0.15;
    button.fontSize = 50;
    button.alpha = 0.3;
    advancedTexture.addControl(button);
  };
  const drawBackwardText = (mesh: Mesh) => {
    const plane = Mesh.CreatePlane("plane", 2);
    plane.parent = mesh;
    plane.position = new Vector3(0.01, 1.4, 0.02);
    plane.rotation = new Vector3(0, Math.PI, 0);

    const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

    const button = GUI.Button.CreateSimpleButton("btn", "Blog");
    button.width = 0.15;
    button.height = 0.15;
    button.fontSize = 50;
    button.alpha = 0.3;
    advancedTexture.addControl(button);
  };

  const tooltip = SceneLoader.ImportMesh(
    "",
    import.meta.env.BASE_URL + "assets/arctic_tooltip/",
    "scene.gltf",
    scene,
    (meshes) => {
      drawFrontText(meshes[0]);
      drawBackwardText(meshes[0]);
      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.3, 0.3, 0.3);
        mesh.position = new Vector3(-0.06, 0.625, -0.75);
      }
    }
  );
};

onMounted(() => {
  const engine = new Engine(islandRef.value, true);

  const createScene = () => new Scene(engine);
  const scene = createScene();
  engine.runRenderLoop(() => scene.render());

  const camera = new ArcRotateCamera(
    "camera",
    2,
    0.9,
    4,
    new Vector3(0.5, 0.3, -1.2),
    scene
  );
  camera.attachControl(islandRef.value, true);
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 7;
  camera.wheelPrecision = 100;
  camera.useFramingBehavior = true;

  drawIsland(scene, camera);
  drawBlogTooltip(scene);

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
