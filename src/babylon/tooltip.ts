import {
  AbstractMesh,
  ActionManager,
  BaseTexture,
  DynamicTexture,
  InterpolateValueAction,
  Material,
  Nullable,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";

type AlbedoTexture = Nullable<BaseTexture>;
interface tooltipMaterialType extends Material {
  albedoTexture?: AlbedoTexture;
}
interface tooltipMeshType extends AbstractMesh {
  material: Nullable<tooltipMaterialType>;
}

const drawBlogTooltip = (scene: Scene) => {
  const tooltipEvent = (mesh: AbstractMesh) => {
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

  const tooltipText = (mesh: tooltipMeshType, text: string) => {
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

    if (!mesh.material) return;
    mesh.material.albedoTexture = textureGround;
  };

  SceneLoader.ImportMesh(
    "",
    import.meta.env.VITE_CDN_URL + "arctic_tooltip/",
    "scene.gltf",
    scene,
    (meshes: AbstractMesh[]) => {
      const tooltipMesh: tooltipMeshType = meshes[1];
      tooltipText(tooltipMesh, "Blog");
      tooltipEvent(tooltipMesh);

      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.3, 0.3, 0.3);
        mesh.position = new Vector3(-0.06, 0.625, -0.75);
      }
    }
  );
};

export { drawBlogTooltip };
