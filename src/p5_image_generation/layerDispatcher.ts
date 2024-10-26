import p5 from "p5";
import { Layer, LayerType } from "./layers";
import { ParallelogramLayer } from "./layerTypes/parallelogram";
import { RegularPolygonLayer } from "./layerTypes/regularPolygonLayer";
import { BooleanSelector } from "./selectors/booleanValueSelectors";
import { ColorSelector } from "./selectors/colorSelectors";
import { NumericValueSelector } from "./selectors/numericValueSelectors";
import { ShapeOperationSelector } from "./selectors/shapeOperationSelector";
import { LayerTypeSelector } from "./selectors/shapeTypeSelector";

type FutureLayer = {
  layer: Layer;
  turnsToWait: number;
};

export type LayerDispatcherConfig = {
  layerTypeSelector: LayerTypeSelector;

  // For grid based layers
  cellColorSelector: ColorSelector;
  cellProbabilitySelector: BooleanSelector;
  cellSize: number;

  //For RegularPolygonLayer
  regularPolygonSides: number;

  // For layers that make child ShapeLayers
  shouldMakeChildSelector: BooleanSelector;
  shapeOperationSelector: ShapeOperationSelector;
  childLayerTurnsToWaitSelector: NumericValueSelector;
};

export class LayerDispatcher {
  futureLayers: FutureLayer[] = [];
  configGenerator: () => LayerDispatcherConfig;

  constructor(configGenerator: () => LayerDispatcherConfig) {
    this.configGenerator = configGenerator;
    this.futureLayers = []
  }

  // Called by layers themselves to request that certain layers get rendered in the future
  // Note that, currently, future layers are not guaranteed to ge generated
  // Since they can be cut off by generateLayers's numLayers function
  public declareFutureLayer(layer: Layer, turnsToWait: number): void {
    this.futureLayers.push({
      layer,
      turnsToWait,
    });
  }

  private getFutureLayersForNewTurn(): Layer[] {
    const layersToAdd: FutureLayer[] = [];
    this.futureLayers.forEach((futureLayer) => {
      if (futureLayer.turnsToWait === 0) layersToAdd.push(futureLayer);
      futureLayer.turnsToWait--;
    });

    this.futureLayers = this.futureLayers.filter(
      (x) => !layersToAdd.includes(x)
    );
    return layersToAdd.map((x) => x.layer);
  }

  private getRandomLayer(p: p5): Layer {
    const config = this.configGenerator();
    const type = config.layerTypeSelector();

    switch (type) {
      case LayerType.Parallelogram: {
        return new ParallelogramLayer(
          p,
          this,
          config.cellColorSelector,
          config.shapeOperationSelector,
          config.cellProbabilitySelector,
          config.cellSize
        );
      }
      case LayerType.RegularPolygon: {
        return new RegularPolygonLayer(
          p,
          this,
          config.cellColorSelector,
          config.shouldMakeChildSelector,
          config.shapeOperationSelector,
          config.childLayerTurnsToWaitSelector,
          config.cellProbabilitySelector,
          config.cellSize,
          config.regularPolygonSides
        );
      }
      default: {
        throw Error(`Layer dispatcher can't render ${type} layers directly`)
      }
    }

  }

  public generateLayers(numLayers: number, p: p5): Layer[] {
    const generatedLayers: Layer[] = [];
    while (generatedLayers.length < numLayers) {
      //First see if there are layers queued up for rendering
      const futureLayers = this.getFutureLayersForNewTurn();
      if (futureLayers.length > 0) {
        futureLayers.forEach((futureLayer) => {
          if (generatedLayers.length < numLayers) {
            generatedLayers.push(futureLayer);
          }
        });
      } else {
        generatedLayers.push(this.getRandomLayer(p));
      }
    }

    return generatedLayers;
  }
}
