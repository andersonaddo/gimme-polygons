import { Layer } from "./layers";
import { RegularPolygonLayer } from "./layerTypes/regularPolygonLayer";
import { BooleanSelector } from "./selectors/booleanValueSelectors";
import { CellSizeSelector } from "./selectors/cellSizeSelectors";
import { ColorSelector } from "./selectors/colorSelectors";

type FutureLayer = {
  layer: Layer;
  turnsToWait: number;
};

type LayerDispatcherConfig = {
  cellColorSelectorGenerator: () => ColorSelector
  cellProbabilitySelectorGenerator: () => BooleanSelector // Only needed if a layer is cell/grid based
  cellSizeSelector: CellSizeSelector // Only needed if a layer is cell/grid based
}

export class LayerDispatcher {
  futureLayers: FutureLayer[] = [];
  config: LayerDispatcherConfig

  constructor(config: LayerDispatcherConfig) {
    this.config = config
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

  // TODO: Improvements for this:
  // This should pass in selectors for:
  // number of sides
  private getRandomLayer(): Layer {
    return new RegularPolygonLayer(
      this,
      this.config.cellColorSelectorGenerator(),
      this.config.cellProbabilitySelectorGenerator(),
      this.config.cellSizeSelector()
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
