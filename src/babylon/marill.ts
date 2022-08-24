import { AbstractMesh, Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export const drawMarill = (scene: Scene) => {
  const Island = SceneLoader.ImportMesh(
    "",
    import.meta.env.VITE_CDN_URL + "maill/",
    // import.meta.env.BASE_URL + "marill/",
    "scene.gltf",
    scene,
    (meshes: AbstractMesh[]) => {
      const rootMesh = meshes[0];
      rootMesh.scaling = new Vector3(0.8, 0.8, 0.8);
      rootMesh.rotation = new Vector3(0, Math.PI / 2, 0);
      rootMesh.position = new Vector3(0.4, 1.2, -0.47);
    }
  );
};
