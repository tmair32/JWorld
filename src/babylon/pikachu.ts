import { AbstractMesh, Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export const drawPikachu = (scene: Scene) => {
  const Island = SceneLoader.ImportMesh(
    "",
    // import.meta.env.BASE_URL + "pikachu/",
    import.meta.env.VITE_CDN_URL + "pikachu/",
    "scene.gltf",
    scene,
    (meshes: AbstractMesh[]) => {
      console.log(meshes);
      const rootMesh = meshes[0];
      rootMesh.scaling = new Vector3(0.005, 0.005, 0.005);
      rootMesh.rotation = new Vector3(Math.PI / 2, 0, 0);
      rootMesh.position = new Vector3(-0.4, 0.14, 0.3);
    }
  );
};
