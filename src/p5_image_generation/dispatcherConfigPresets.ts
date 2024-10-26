import p5 from "p5";
import { LayerDispatcherConfig } from "./layerDispatcher";
import {
  evenSelector,
  everyOtherSelector,
  perlinSelector,
  randomSelector,
} from "./selectors/booleanValueSelectors";
import {
  DEBUG_COLOR_SCHEME,
  baseColorSelector,
  accentColorSelector,
  randomColorSelector,
  COLOR_SCHEMES,
} from "./selectors/colorSelectors";
import { randomOperationSelector } from "./selectors/shapeOperationSelector";

type PresetConfigGenerator = (
  p: p5,
  width: number,
  height: number
) => () => LayerDispatcherConfig;

const debugPreset1: PresetConfigGenerator = (
  p: p5,
  width: number,
  height: number
) => {
  const shouldUsePerlin = everyOtherSelector(2);

  const configGenerator: () => LayerDispatcherConfig = () => {
    const colorScheme = DEBUG_COLOR_SCHEME;
    const usingPerlin = shouldUsePerlin();
    const cellProbSelector = usingPerlin
      ? perlinSelector(p, 0.2)
      : everyOtherSelector(2);
    const layerCellColorSelector = usingPerlin
      ? baseColorSelector(p, colorScheme)
      : accentColorSelector(p, colorScheme);
    const layerOperationSelector = randomOperationSelector();
    const layerShouldMakeChildSelector = everyOtherSelector(2);
    const cellSize = width / 20;
    const regularPolygonSides = usingPerlin ? 80 : 4;

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
    };
  };
  return configGenerator;
};

const debugPreset2: PresetConfigGenerator = (
  p: p5,
  width: number,
  height: number
) => {
  const configGenerator: () => LayerDispatcherConfig = () => {
    const colorScheme = DEBUG_COLOR_SCHEME;
    const cellProbSelector = evenSelector();
    const layerCellColorSelector = randomColorSelector(p, colorScheme);
    const layerOperationSelector = randomOperationSelector();
    const layerShouldMakeChildSelector = everyOtherSelector(2);
    const cellSize = width / 20;
    const regularPolygonSides = 5;

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
    };
  };
  return configGenerator;
};

const debugPreset3: PresetConfigGenerator = (
  p: p5,
  width: number,
  height: number
) => {
  const configGenerator: () => LayerDispatcherConfig = () => {
    const colorScheme = COLOR_SCHEMES[0];
    const cellProbSelector = randomSelector(0.1);
    const layerCellColorSelector = randomColorSelector(p, colorScheme);
    const layerOperationSelector = randomOperationSelector();
    const layerShouldMakeChildSelector = everyOtherSelector(2);
    const cellSize = width / 20;
    const regularPolygonSides = 5;

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
    };
  };
  return configGenerator;
};

export const ALL_CONFIG_PRESETS = {
  debugPreset1,
  debugPreset2,
  debugPreset3,
};
