import p5 from "p5";
import { LayerDispatcher } from "./layerDispatcher";
import { everyOtherSelector, perlinSelector } from "./selectors/booleanValueSelectors";
import { accentColorSelector, DEBUG_COLOR_SCHEME, baseColorSelector } from "./selectors/colorSelectors";
import { Image } from "./types";

export const generateImageDefinition = (
  p: p5,
  width: number,
  height: number,
): Image => {
  const numOfLayers = 4;
  const colorScheme = DEBUG_COLOR_SCHEME

  const shouldUsePerlin = everyOtherSelector(2)
  const configGenerator = () => {
    const usingPerlin = shouldUsePerlin()
    const cellProbSelector = usingPerlin ? perlinSelector(p, 0.2) : everyOtherSelector(2)
    const layerCellColorSelector = usingPerlin ? baseColorSelector(p, colorScheme) : accentColorSelector(p, colorScheme)
    const cellSize = width / 20;
    const regularPolygonSides = usingPerlin ? 80 : 4

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides
    }
  }


  const layerDispatcher = new LayerDispatcher(configGenerator);
  const layers = layerDispatcher.generateLayers(numOfLayers);

  return {
    height,
    width,
    layers,
  };
};
