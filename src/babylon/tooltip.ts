import {
  AbstractMesh,
  ActionManager,
  BaseTexture,
  DynamicTexture,
  ExecuteCodeAction,
  InterpolateValueAction,
  Material,
  Nullable,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import { useRouter } from "vue-router";

type AlbedoTexture = Nullable<BaseTexture>;
interface tooltipMaterialType extends Material {
  albedoTexture?: AlbedoTexture;
}
interface tooltipMeshType extends AbstractMesh {
  material: Nullable<tooltipMaterialType>;
}

const tooltipEvent = (mesh: AbstractMesh, scene: Scene, type: string) => {
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

  switch (type) {
    case "CV": {
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
          location.href += "roadmap";
        })
      );
      break;
    }
  }
};

const tooltipText = (mesh: tooltipMeshType, scene: Scene, text: string) => {
  const font = "bold 48px serif";
  const textureResolution = 512;
  const textureGround = new DynamicTexture(
    "dynamic texture",
    textureResolution,
    scene,
    true
  );
  textureGround.hasAlpha = true;
  textureGround.uAng = Math.PI;

  const drawText = (type: string) => {
    switch (type) {
      case "Blog": {
        textureGround.drawText(
          text,
          208,
          330,
          font,
          "#000",
          "#fff",
          true,
          true
        );
        break;
      }
      case "CV": {
        textureGround.drawText(
          text,
          222,
          330,
          font,
          "#000",
          "#fff",
          true,
          true
        );
        break;
      }
    }
  };

  if (!mesh.material) return;
  drawText(text);
  mesh.material.albedoTexture = textureGround;
};

const drawTooltip = (position: Vector3, scene: Scene, text: string) => {
  SceneLoader.ImportMesh(
    "",
    import.meta.env.VITE_CDN_URL + "arctic_tooltip/",
    "scene.gltf",
    scene,
    (meshes: AbstractMesh[]) => {
      const tooltipMesh: tooltipMeshType = meshes[1];
      tooltipText(tooltipMesh, scene, text);
      tooltipEvent(tooltipMesh, scene, text);

      for (let mesh of meshes) {
        mesh.scaling = new Vector3(0.3, 0.3, 0.3);
        mesh.position = position;
      }
    }
  );
};

export { drawTooltip };
