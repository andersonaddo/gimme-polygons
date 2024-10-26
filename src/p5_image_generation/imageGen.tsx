import p5 from "p5";
import { LayerDispatcher } from "./layerDispatcher";
import { Image } from "./types";
import { ALL_CONFIG_PRESETS } from "./dispatcherConfigPresets";

export const generateImageDefinition = (
  p: p5,
  width: number,
  height: number,
): Image => {
  const numOfLayers = 4;

  const configGenerator = ALL_CONFIG_PRESETS.debugPreset2(p, width, height)
  const layerDispatcher = new LayerDispatcher(configGenerator);
  const layers = layerDispatcher.generateLayers(numOfLayers);

  return {
    height,
    width,
    layers,
  };
};
