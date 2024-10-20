import { Layer } from "./layers";
import { ColorScheme } from "./types";
import { RegularPolygonLayer } from "./layerTypes/regularPolygonLayer";
import { CellSizeSelector } from "./selectors/cellSizeSelectors";

type FutureLayer = {
  layer: Layer;
  turnsToWait: number;
};

export class LayerDispatcher {
  futureLayers: FutureLayer[] = [];
  colorScheme: ColorScheme;
  cellSizeSelector: CellSizeSelector;

  constructor(colorScheme: ColorScheme, cellSizeSelector: CellSizeSelector) {
    this.colorScheme = colorScheme;
    this.cellSizeSelector = cellSizeSelector;
  }

  // Called by layers themselves to request that certain layers get rendered in the future
  // Nore that, currently, future layers are not guaranteed to ge generated
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
  // color
  // number of sides
  // cell probability selector (yes, a selector for a selector)
  private getRandomLayer(): Layer {
    return new RegularPolygonLayer(
      this.colorScheme,
      this.cellSizeSelector(),
      this
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
