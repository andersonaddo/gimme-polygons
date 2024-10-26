import p5 from "p5";
import { LayerDispatcher } from "./layerDispatcher";
import { Image } from "./types";
import { ImageGenerationPreset } from "./imageGenPresets";

export const generateImageDefinition = (
  p: p5,
  width: number,
  height: number,
  preset: ImageGenerationPreset
): Image => {
  const params = preset(p, width, height)
  const layerDispatcher = new LayerDispatcher(params.layerDispatcherConfigGenerator);
  const layers = layerDispatcher.generateLayers(params.numLayers);

  return {
    height,
    width,
    layers,
  };
};
