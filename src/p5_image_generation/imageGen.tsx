import p5 from "p5";
import { LayerDispatcher } from "./layerDispatcher";
import { perlinSelector } from "./selectors/booleanValueSelectors";
import { COLOR_SCHEMES, randomColorSelector } from "./selectors/colorSelectors";
import { Image } from "./types";

export const generateImageDefinition = (
  p: p5,
  width: number,
  height: number,
): Image => {
  const numOfLayers = 5;
  const colorScheme = COLOR_SCHEMES[Math.floor(Math.random() * COLOR_SCHEMES.length)]

  const layerCellSizeSelector = () => width / 20;
  const layerCellProbabilitySelectorGenerator = () => perlinSelector(p, 0.2)
  const layerCellColorSelectorGenerator = () => randomColorSelector(p, colorScheme)

  const layerDispatcher = new LayerDispatcher(
    {
      cellColorSelectorGenerator: layerCellColorSelectorGenerator,
      cellProbabilitySelectorGenerator: layerCellProbabilitySelectorGenerator,
      cellSizeSelector: layerCellSizeSelector
    }
  );

  const layers = layerDispatcher.generateLayers(numOfLayers);

  return {
    height,
    width,
    layers,
  };
};
