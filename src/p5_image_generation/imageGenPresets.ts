import p5 from "p5";
import { PartialLayerDispatcherConfig } from "./layerDispatcher";
import { LayerType } from "./layers";
import { BooleanSelectors } from "./selectors/booleanValueSelectors";
import {
  COLOR_SCHEMES,
  ColorSelectors,
  DEBUG_COLOR_SCHEME,
} from "./selectors/colorSelectors";
import { NumericValueSelectors } from "./selectors/numericValueSelectors";
import { ShapeOperationSelectors } from "./selectors/shapeOperationSelector";
import { LayerTypeSelectors } from "./selectors/shapeTypeSelector";

//Note that these do not have to provide full LayerDispatcherConfigs
//if they're certain that parts of the config won't be used.
//There will be errors of the missing parts are needed at runtime, though
export type ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  layerDispatcherConfigGenerator: () => PartialLayerDispatcherConfig;
  numLayers: number;
};

const debugPreset1: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  const shouldUsePerlin = BooleanSelectors.everyOtherSelector(2);

  const configGenerator: () => PartialLayerDispatcherConfig = () => {
    const colorScheme = DEBUG_COLOR_SCHEME;
    const usingPerlin = shouldUsePerlin();
    const cellProbSelector = usingPerlin
      ? BooleanSelectors.perlinSelector(p, 0.2)
      : BooleanSelectors.everyOtherSelector(2);
    const layerCellColorSelector = usingPerlin
      ? ColorSelectors.baseColorSelector(p, colorScheme)
      : ColorSelectors.accentColorSelector(p, colorScheme);
    const layerOperationSelector =
      ShapeOperationSelectors.randomOperationSelector(p);
    const layerShouldMakeChildSelector = BooleanSelectors.everyOtherSelector(2);
    const layerCellSizeSelector = NumericValueSelectors.constantNumberSelector(
      width / 20
    );
    const layerRegularPolygonSidesSelector =
      NumericValueSelectors.constantNumberSelector(usingPerlin ? 80 : 4);
    const shapeRadiusSelector = NumericValueSelectors.boundRandomSelector(
      p,
      10,
      layerCellSizeSelector() / 2
    );
    const layerTypeSelector =
      LayerTypeSelectors.polygonOrParallelogramTypeSelector(p, 1);
    const childTurnsToWaitSelector =
      NumericValueSelectors.constantNumberSelector(2);

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSizeSelector: layerCellSizeSelector,
      regularPolygonSidesSelector: layerRegularPolygonSidesSelector,
      shapeRadiusSelector: shapeRadiusSelector,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
      childLayerTurnsToWaitSelector: childTurnsToWaitSelector,
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 4 };
};

const debugPreset2: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  const configGenerator: () => PartialLayerDispatcherConfig = () => {
    const colorScheme = DEBUG_COLOR_SCHEME;
    const cellProbSelector = BooleanSelectors.evenSelector(p);
    const layerCellColorSelector = ColorSelectors.randomColorSelector(
      p,
      colorScheme
    );
    const layerOperationSelector =
      ShapeOperationSelectors.randomOperationSelector(p);
    const layerShouldMakeChildSelector = BooleanSelectors.everyOtherSelector(2);
    const layerCellSizeSelector = NumericValueSelectors.constantNumberSelector(
      width / 20
    );
    const layerRegularPolygonSidesSelector =
      NumericValueSelectors.constantNumberSelector(5);
    const shapeRadiusSelector = NumericValueSelectors.boundRandomSelector(
      p,
      10,
      layerCellSizeSelector() / 2
    );
    const layerTypeSelector =
      LayerTypeSelectors.polygonOrParallelogramTypeSelector(p, 1);
    const childTurnsToWaitSelector =
      NumericValueSelectors.constantNumberSelector(2);

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSizeSelector: layerCellSizeSelector,
      regularPolygonSidesSelector: layerRegularPolygonSidesSelector,
      shapeRadiusSelector: shapeRadiusSelector,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
      childLayerTurnsToWaitSelector: childTurnsToWaitSelector,
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 4 };
};

const exampleParallelogramSelector: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  const configGenerator: () => PartialLayerDispatcherConfig = () => {
    const colorScheme = COLOR_SCHEMES[0];
    const cellProbSelector = BooleanSelectors.randomSelector(p, 0.1);
    const layerCellColorSelector = ColorSelectors.randomColorSelector(
      p,
      colorScheme
    );
    const layerShouldMakeChildSelector = BooleanSelectors.never();
    const layerCellSizeSelector = NumericValueSelectors.constantNumberSelector(
      width / 20
    );
    const layerTypeSelector =
      LayerTypeSelectors.polygonOrParallelogramTypeSelector(p, 0);

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSizeSelector: layerCellSizeSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 4 };
};

const childLayersExample: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  let layerCount = -1;

  const configGenerator: () => PartialLayerDispatcherConfig = () => {
    // TODO: perform background generation in layer dispatcher
    layerCount++;

    if (layerCount === 0) {
      return {
        cellColorSelector: () => "#221C35",
        layerTypeSelector: () => LayerType.Background,
      };
    }

    const colorScheme = COLOR_SCHEMES[1];
    const layerCellSizeSelector = NumericValueSelectors.constantNumberSelector(
      width / 20
    );
    const layerRegularPolygonSidesSelector =
      NumericValueSelectors.constantNumberSelector(5);
    const shapeRadiusSelector = NumericValueSelectors.boundRandomSelector(
      p,
      10,
      layerCellSizeSelector() / 2
    );
    const cellProbSelector = BooleanSelectors.randomSelector(p, 0.6);
    const layerCellColorSelector = ColorSelectors.randomColorSelector(
      p,
      colorScheme
    );
    const layerOperationSelector =
      ShapeOperationSelectors.randomOperationSelector(p);
    const layerShouldMakeChildSelector = BooleanSelectors.always();
    const layerTypeSelector =
      LayerTypeSelectors.polygonOrParallelogramTypeSelector(p, 1);
    const childTurnsToWaitSelector =
      NumericValueSelectors.constantNumberSelector(0);

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSizeSelector: layerCellSizeSelector,
      regularPolygonSidesSelector: layerRegularPolygonSidesSelector,
      shapeRadiusSelector: shapeRadiusSelector,
      shapeOperationSelector: layerOperationSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
      childLayerTurnsToWaitSelector: childTurnsToWaitSelector,
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 3 };
};

const exampleStripes: ImageGenerationPreset = (
  p: p5,
  width: number,
  height: number
) => {
  let layerCount = -1;

  const configGenerator: () => PartialLayerDispatcherConfig = () => {
    layerCount++;

    if (layerCount === 0) {
      return {
        cellColorSelector: () => "#ffffff",
        layerTypeSelector: () => LayerType.Background,
      };
    }

    const colorScheme = COLOR_SCHEMES[0];
    const cellProbSelector = BooleanSelectors.sineBatchSelector(p);
    const layerCellColorSelector = ColorSelectors.perlinColorSelector(
      p,
      colorScheme,
      0.4
    );
    const layerShouldMakeChildSelector = BooleanSelectors.never();
    const layerCellSizeSelector = NumericValueSelectors.constantNumberSelector(
      width / 40
    );
    const layerTypeSelector =
      LayerTypeSelectors.polygonOrParallelogramTypeSelector(p, 1);
    const layerRegularPolygonSidesSelector =
      NumericValueSelectors.constantNumberSelector(4);

    const shapeRadiusSelector = NumericValueSelectors.constantNumberSelector(
      layerCellSizeSelector() / Math.sqrt(2)
    );

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: cellProbSelector,
      cellSizeSelector: layerCellSizeSelector,
      regularPolygonSidesSelector: layerRegularPolygonSidesSelector,
      shapeRadiusSelector: shapeRadiusSelector,
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 2 };
};

const c1: ImageGenerationPreset = (p: p5, width: number, height: number) => {
  let layerCount = -1;

  const configGenerator: () => PartialLayerDispatcherConfig = () => {
    layerCount++;

    const colorScheme = COLOR_SCHEMES[3];
    const cellProbSelector = BooleanSelectors.sineBatchSelector(p, -0.85);
    const layerCellColorSelector = ColorSelectors.perlinColorSelector(
      p,
      colorScheme,
      0.03
    );
    const layerShouldMakeChildSelector = BooleanSelectors.never();
    const layerCellSizeSelector = NumericValueSelectors.constantNumberSelector(
      width / 20
    );
    const layerTypeSelector =
      LayerTypeSelectors.polygonOrParallelogramTypeSelector(p, 1);
    let layerRegularPolygonSidesSelector =
      NumericValueSelectors.constantNumberSelector(4);

    let shapeRadiusSelector = NumericValueSelectors.constantNumberSelector(
      layerCellSizeSelector() / Math.sqrt(2)
    );

    if (layerCount === 0) {
      return {
        cellColorSelector: () => "#ffffff",
        layerTypeSelector: () => LayerType.Background,
      };
    }

    if (layerCount === 1) {
      return {
        cellColorSelector: layerCellColorSelector,
        cellProbabilitySelector: BooleanSelectors.always(),
        cellSizeSelector: layerCellSizeSelector,
        regularPolygonSidesSelector:
          NumericValueSelectors.constantNumberSelector(7),
        shapeRadiusSelector: NumericValueSelectors.constantNumberSelector(13),
        shouldMakeChildSelector: layerShouldMakeChildSelector,
        layerTypeSelector: layerTypeSelector,
      };
    }

    if (layerCount === 2) {
      return {
        cellColorSelector: layerCellColorSelector,
        cellProbabilitySelector: cellProbSelector,
        cellSizeSelector: layerCellSizeSelector,
        regularPolygonSidesSelector: layerRegularPolygonSidesSelector,
        shapeRadiusSelector: shapeRadiusSelector,
        shouldMakeChildSelector: layerShouldMakeChildSelector,
        layerTypeSelector: layerTypeSelector,
      };
    }

    return {
      cellColorSelector: layerCellColorSelector,
      cellProbabilitySelector: BooleanSelectors.randomSelector(p, 0.01),
      cellSizeSelector: layerCellSizeSelector,
      regularPolygonSidesSelector:
        NumericValueSelectors.constantNumberSelector(18),
      shapeRadiusSelector: NumericValueSelectors.constantNumberSelector(
        width / 10
      ),
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 4 };
};

const c2: ImageGenerationPreset = (p: p5, width: number, height: number) => {
  let layerCount = -1;

  const configGenerator: () => PartialLayerDispatcherConfig = () => {
    layerCount++;

    const colorScheme = COLOR_SCHEMES[2];
    const layerShouldMakeChildSelector = BooleanSelectors.never();
    const layerCellSizeSelector = NumericValueSelectors.constantNumberSelector(
      width / 20
    );
    const layerTypeSelector =
      LayerTypeSelectors.polygonOrParallelogramTypeSelector(p, 0.5);

    if (layerCount === 0) {
      return {
        cellColorSelector: ColorSelectors.baseColorSelector(p, colorScheme),
        cellProbabilitySelector: BooleanSelectors.always(),
        cellSizeSelector:  NumericValueSelectors.constantNumberSelector(5),
        regularPolygonSidesSelector:
          NumericValueSelectors.constantNumberSelector(4),
        shapeRadiusSelector: NumericValueSelectors.constantNumberSelector(5),
        shouldMakeChildSelector: layerShouldMakeChildSelector,
        layerTypeSelector: layerTypeSelector,
      };
    }

    return {
      cellColorSelector: ColorSelectors.baseColorSelector(p, colorScheme),
      cellProbabilitySelector: BooleanSelectors.randomSelector(p, 0.06),
      cellSizeSelector: layerCellSizeSelector,
      regularPolygonSidesSelector:
        NumericValueSelectors.constantNumberSelector(6),
      shapeRadiusSelector: NumericValueSelectors.constantNumberSelector(
        width / 20
      ),
      shouldMakeChildSelector: layerShouldMakeChildSelector,
      layerTypeSelector: layerTypeSelector,
    };
  };

  return { layerDispatcherConfigGenerator: configGenerator, numLayers: 3};
};

export const ALL_IMAGE_PRESETS: Record<string, ImageGenerationPreset> = {
  debugPreset1,
  debugPreset2,
  exampleParallelogramSelector,
  childLayersExample,
  exampleStripes,
  c1,
  c2,
};