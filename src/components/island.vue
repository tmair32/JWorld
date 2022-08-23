<script setup lang="ts">
import "@babylonjs/loaders";
import {
  ActionManager,
  ArcRotateCamera,
  DynamicTexture,
  Engine,
  InterpolateValueAction,
  Mesh,
  MeshBuilder,
  PointLight,
  Scene,
  SceneLoader,
  Texture,
  Vector3,
} from "@babylonjs/core";

import * as GUI from "@babylonjs/gui";

const islandRef = ref<HTMLCanvasElement>(null);

const drawIsland = (scene: Scene, camera: ArcRotateCamera) => {
  const Island = SceneLoader.ImportMesh(
    "",
    import.meta.env.BASE_URL + "island/fantasy_eco_city/",
    "scene.gltf",
    scene
  );
};

const drawBlogTooltip = (scene: Scene, highlight: HighlightLayer) => {
  const tooltipEvent = (mesh: Mesh) => {
    mesh.actionManager = new ActionManager(scene);
    mesh.actionManager.registerAction(
      new InterpolateValueAction(
        ActionManager.OnPointerOverTrigger,
        mesh,
        "scaling",
        new Vector3(0.4, 0.4, 0.4),
        500
      )
    );
    mesh.actionManager.registerAction(
      new InterpolateValueAction(
        ActionManager.OnPointerOutTrigger,
        mesh,
        "scaling",
        new Vector3(0.3, 0.3, 0.3),
        500
      )
    );
  };

  const tooltipText = (mesh: Mesh, text: text) => {
    const font = "bold 50px serif";
    const textureResolution = 512;
    const textureGround = new DynamicTexture(
      "dynamic texture",
      textureResolution,
      scene,
      true
    );
    textureGround.hasAlpha = true;
    textureGround.uAng = Math.PI;
    textureGround.drawText(text, 208, 330, font, "#000", "#fff", true, true);

    mesh.material.albedoTexture = textureGround;
  };

  const tooltip = SceneLoader.ImportMesh(
    "",
    import.meta.env.BASE_URL + "arctic_tooltip/",
    "scene.gltf",
    scene,
    (meshes) => {
      const rootMesh = meshes[0];
      const tooltipMesh = meshes[1];

      tooltipText(tooltipMesh, "Blog");
      tooltipEvent(tooltipMesh);

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
