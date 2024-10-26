import p5 from "p5";
import { LayerDispatcherConfig } from "./layerDispatcher";
import {
  BooleanSelectors,
} from "./selectors/booleanValueSelectors";
import {
  DEBUG_COLOR_SCHEME,
  ColorSelectors,
  COLOR_SCHEMES,
} from "./selectors/colorSelectors";
import { ShapeOperationSelectors } from "./selectors/shapeOperationSelector";
import { LayerTypeSelectors } from "./selectors/shapeTypeSelector";
import { NumericValueSelectors } from "./selectors/numericValueSelectors";
import { ShapeOperation } from "./shape";

export type ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  layerDispatcherConfigGenerator: () => LayerDispatcherConfig;
  numLayers: number
}

const debugPreset1: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  const shouldUsePerlin = BooleanSelectors.everyOtherSelector(2);

  const configGenerator: () => LayerDispatcherConfig = () => {
    const colorScheme = DEBUG_COLOR_SCHEME;
    const usingPerlin = shouldUsePerlin();
    const cellProbSelector = usingPerlin
      ? BooleanSelectors.perlinSelector(p, 0.2)
      : BooleanSelectors.everyOtherSelector(2);
    const layerCellColorSelector = usingPerlin
      ? ColorSelectors.baseColorSelector(p, colorScheme)
      : ColorSelectors.accentColorSelector(p, colorScheme);
    const layerOperationSelector = ShapeOperationSelectors.randomOperationSelector();
    const layerShouldMakeChildSelector = BooleanSelectors.everyOtherSelector(2);
    const cellSize = width / 20;
    const regularPolygonSides = usingPerlin ? 80 : 4;
    const layerTypeSelector = LayerTypeSelectors.polygonOrParallelogramTypeSelector(1)
    const childTurnsToWaitSelector = NumericValueSelectors.constantNumberSelector(2)

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
      childLayerTurnsToWaitSelector: childTurnsToWaitSelector
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 4 };
};


const debugPreset2: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  const configGenerator: () => LayerDispatcherConfig = () => {
    const colorScheme = DEBUG_COLOR_SCHEME;
    const cellProbSelector = BooleanSelectors.evenSelector();
    const layerCellColorSelector = ColorSelectors.randomColorSelector(p, colorScheme);
    const layerOperationSelector = ShapeOperationSelectors.randomOperationSelector();
    const layerShouldMakeChildSelector = BooleanSelectors.everyOtherSelector(2);
    const cellSize = width / 20;
    const regularPolygonSides = 5;
    const layerTypeSelector = LayerTypeSelectors.polygonOrParallelogramTypeSelector(1)
    const childTurnsToWaitSelector = NumericValueSelectors.constantNumberSelector(2)

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
      childLayerTurnsToWaitSelector: childTurnsToWaitSelector
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 4 };
};

const exampleParallelogramSelector: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  const configGenerator: () => LayerDispatcherConfig = () => {
    const colorScheme = COLOR_SCHEMES[0];
    const cellProbSelector = BooleanSelectors.randomSelector(0.1);
    const layerCellColorSelector = ColorSelectors.randomColorSelector(p, colorScheme);
    const layerOperationSelector = ShapeOperationSelectors.randomOperationSelector();
    const layerShouldMakeChildSelector = BooleanSelectors.everyOtherSelector(2);
    const cellSize = width / 20;
    const regularPolygonSides = 5;
    const layerTypeSelector = LayerTypeSelectors.polygonOrParallelogramTypeSelector(0)
    const childTurnsToWaitSelector = NumericValueSelectors.constantNumberSelector(2)

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
      childLayerTurnsToWaitSelector: childTurnsToWaitSelector
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 4 };
};


const childLayersExample: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  const configGenerator: () => LayerDispatcherConfig = () => {
    const colorScheme = COLOR_SCHEMES[1];
    const cellSize = width / 20;
    const regularPolygonSides = 5;

    const cellProbSelector = BooleanSelectors.randomSelector(0.6);
    const layerCellColorSelector = ColorSelectors.randomColorSelector(p, colorScheme)
    const layerOperationSelector = ShapeOperationSelectors.randomOperationSelector();
    const layerShouldMakeChildSelector = BooleanSelectors.always()
    const layerTypeSelector = LayerTypeSelectors.polygonOrParallelogramTypeSelector(1)
    const childTurnsToWaitSelector = NumericValueSelectors.constantNumberSelector(0)

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSize,
      regularPolygonSides,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
      childLayerTurnsToWaitSelector: childTurnsToWaitSelector
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 2 };
};


export const ALL_IMAGE_PRESETS: Record<string, ImageGenerationPreset> = {
  debugPreset1,
  debugPreset2,
  exampleParallelogramSelector,
  childLayersExample
};
