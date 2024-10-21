import { Layer } from "./layers";
import { RegularPolygonLayer } from "./layerTypes/regularPolygonLayer";
import { BooleanSelector } from "./selectors/booleanValueSelectors";
import { ColorSelector } from "./selectors/colorSelectors";

type FutureLayer = {
  layer: Layer;
  turnsToWait: number;
};

type LayerDispatcherConfig = {
  cellColorSelector: ColorSelector
  cellProbabilitySelector: BooleanSelector // Only needed if a layer is cell/grid based
  cellSize: number // Only needed if a layer is cell/grid based
  regularPolygonSides: number //For RegularPolygonLayer
}

export class LayerDispatcher {
  futureLayers: FutureLayer[] = [];
  configGenerator: () => LayerDispatcherConfig

  constructor(configGenerator: () => LayerDispatcherConfig) {
    this.configGenerator = configGenerator
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
    const config = this.configGenerator()
    return new RegularPolygonLayer(
      this,
      config.cellColorSelector,
      config.cellProbabilitySelector,
      config.cellSize,
      config.regularPolygonSides
    );
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
