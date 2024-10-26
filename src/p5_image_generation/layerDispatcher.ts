import { Layer, LayerType } from "./layers";
import { ParallelogramLayer } from "./layerTypes/parallelogram";
import { RegularPolygonLayer } from "./layerTypes/regularPolygonLayer";
import { BooleanSelector } from "./selectors/booleanValueSelectors";
import { ColorSelector } from "./selectors/colorSelectors";
import { ShapeOperationSelector } from "./selectors/shapeOperationSelector";
import { LayerTypeSelector } from "./selectors/shapeTypeSelector";

type FutureLayer = {
  layer: Layer;
  turnsToWait: number;
};

export type LayerDispatcherConfig = {
  layerTypeSelector: LayerTypeSelector;
  cellColorSelector: ColorSelector;
  cellProbabilitySelector: BooleanSelector; // Only needed if a layer is cell/grid based
  cellSize: number; // Only needed if a layer is cell/grid based
  regularPolygonSides: number; //For RegularPolygonLayer
  shapeOperationSelector: ShapeOperationSelector;
  shouldMakeChildSelector: BooleanSelector;
};

export class LayerDispatcher {
  futureLayers: FutureLayer[] = [];
  configGenerator: () => LayerDispatcherConfig;

  constructor(configGenerator: () => LayerDispatcherConfig) {
    this.configGenerator = configGenerator;
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

  private getRandomLayer(): Layer {
    const config = this.configGenerator();

    const type = config.layerTypeSelector()

    switch (type) {
      case LayerType.Parallelogram: {
        return new ParallelogramLayer(
          this,
          config.cellColorSelector,
          config.shapeOperationSelector,
          config.cellProbabilitySelector,
          config.cellSize
        );
      }
      case LayerType.RegularPolygon: {
        return new RegularPolygonLayer(
          this,
          config.cellColorSelector,
          config.shouldMakeChildSelector,
          config.shapeOperationSelector,
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

  public generateLayers(numLayers: number): Layer[] {
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
        generatedLayers.push(this.getRandomLayer());
      }
    }

    return generatedLayers;
  }
}
