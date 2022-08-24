import { AbstractMesh, Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export const drawIsland = (scene: Scene) => {
  const Island = SceneLoader.ImportMesh(
    "",
    import.meta.env.BASE_URL + "island/fantasy_eco_city/",
    "scene.gltf",
    scene
  );
};
