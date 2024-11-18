import p5 from "p5";
import { LayerDispatcher } from "./layerDispatcher";
import { Image } from "./types";
import { ImageGenerationPreset } from "./imageGenPresets";

export const generateImageDefinition = (
  p: p5,
  preset: ImageGenerationPreset
): Image => {
  const params = preset.getPreset(p, p.width, p.height)
  const layerDispatcher = new LayerDispatcher(params.layerDispatcherConfigGenerator);
  const layers = layerDispatcher.generateLayers(params.numLayers, p);

  return {
    layers,
  };
};
