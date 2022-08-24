import { AbstractMesh, Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export const drawIsland = (scene: Scene) => {
  const Island = SceneLoader.ImportMesh(
    "",
    import.meta.env.BASE_URL + "island/fantasy_eco_city/",
    "scene.gltf",
    scene
  );
};

export const drawWaterIsland = (scene: Scene) => {
  const Island = SceneLoader.ImportMesh(
    "",
    import.meta.env.BASE_URL + "island/water_island/",
    "scene.gltf",
    scene,
    (meshes: AbstractMesh[]) => {
      const rootMesh = meshes[0];
      rootMesh.scaling = new Vector3(0.0008, 0.0008, 0.0008);
      rootMesh.rotation = new Vector3(0, 0, 0);
      rootMesh.position = new Vector3(-0.4, 0.2, 0.6);
    }
  );
};
