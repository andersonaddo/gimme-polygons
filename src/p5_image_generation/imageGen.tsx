import { getRandomColorScheme } from "./colors";
import { LayerDispatcher } from "./layerDispatcher";
import { getStandardCellSizeSelector } from "./selectors/cellSizeSelectors";
import { Image } from "./types";

export const generateImageDefinition = (
  width: number,
  height: number
): Image => {
  const numOfLayers = 5;
  const colorScheme = getRandomColorScheme();
  const layerCellSizeSelector = getStandardCellSizeSelector();

  const layerDispatcher = new LayerDispatcher(
    colorScheme,
    layerCellSizeSelector
  );

  const layers = layerDispatcher.generateLayers(numOfLayers);

  return {
    height,
    width,
    layers,
  };
};
