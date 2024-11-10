import p5 from "p5";
import { Layer, LayerType } from "./layers";
import { ParallelogramLayer } from "./layerTypes/parallelogram";
import { RegularPolygonLayer } from "./layerTypes/regularPolygonLayer";
import { BooleanSelector } from "./selectors/booleanValueSelectors";
import { ColorSelector } from "./selectors/colorSelectors";
import { NumericValueSelector } from "./selectors/numericValueSelectors";
import { ShapeOperationSelector } from "./selectors/shapeOperationSelector";
import { LayerTypeSelector } from "./selectors/shapeTypeSelector";
import { BackgroundLayer } from "./layerTypes/backgroundLayer";
import { DummySelector } from "./selectors/dummySelector";

type FutureLayer = {
  layerGenerator: LayerGeneratingClosure;
  turnsToWait: number;
};

export type LayerDispatcherConfig = {
  layerTypeSelector: LayerTypeSelector;

  // For grid based layers
  cellColorSelector: ColorSelector;
  cellProbabilitySelector: BooleanSelector;
  cellSizeSelector: NumericValueSelector;

  //For RegularPolygonLayer
  regularPolygonSidesSelector: NumericValueSelector;
  shapeRadiusSelector: NumericValueSelector;

  // For layers that make child ShapeLayers
  shouldMakeChildSelector: BooleanSelector;
  shapeOperationSelector: ShapeOperationSelector; //Note that this is per shape, not for the whole layer
  childLayerTurnsToWaitSelector: NumericValueSelector;
};

export type PartialLayerDispatcherConfig = Partial<LayerDispatcherConfig> &
  Pick<LayerDispatcherConfig, "layerTypeSelector">;

export type LayerGeneratingClosure = (config: LayerDispatcherConfig) => Layer;

export class LayerDispatcher {
  futureLayers: FutureLayer[] = [];
  configGenerator: () => PartialLayerDispatcherConfig;

  constructor(configGenerator: () => PartialLayerDispatcherConfig) {
    this.configGenerator = configGenerator;
    this.futureLayers = [];
  }

  private assureFunc<T extends ((...args: any[]) => any) | undefined>(
    func: T,
    name?: string
  ): NonNullable<T> {
    return func ?? (DummySelector(name) as NonNullable<T>);
  }

  private getFullConfig(): LayerDispatcherConfig {
    const config = this.configGenerator();
    return {
      layerTypeSelector: this.assureFunc(config.layerTypeSelector, "layerTypeSelector"),
      cellColorSelector: this.assureFunc(config.cellColorSelector, "cellColorSelector"),
      cellProbabilitySelector: this.assureFunc(config.cellProbabilitySelector, "cellProbabilitySelector"),
      cellSizeSelector: this.assureFunc(config.cellSizeSelector, "cellSizeSelector"),
      regularPolygonSidesSelector: this.assureFunc(
        config.regularPolygonSidesSelector,
        "regularPolygonSidesSelector"
      ),
      shapeRadiusSelector: this.assureFunc(config.shapeRadiusSelector, "shapeRadiusSelector"),
      shouldMakeChildSelector: this.assureFunc(config.shouldMakeChildSelector, "shouldMakeChildSelector"),
      shapeOperationSelector: this.assureFunc(config.shapeOperationSelector, "shapeOperationSelector"),
      childLayerTurnsToWaitSelector: this.assureFunc(
        config.childLayerTurnsToWaitSelector,
        "childLayerTurnsToWaitSelector"
      ),
    };
  }

  // Called by layers themselves to request that certain layers get rendered in the future
  // Note that, currently, future layers are not guaranteed to ge generated
  // Since they can be cut off by generateLayers's numLayers function
  public declareFutureLayer(
    layerGenerator: LayerGeneratingClosure,
    turnsToWait: number
  ): void {
    this.futureLayers.push({
      layerGenerator,
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
    return layersToAdd.map((x) => x.layerGenerator(this.getFullConfig()));
  }

  private getRandomLayer(p: p5): Layer {
    const config = this.getFullConfig();
    const type = config.layerTypeSelector();

    switch (type) {
      case LayerType.Parallelogram: {
        return new ParallelogramLayer(
          p,
          this,
          config.cellColorSelector,
          config.shouldMakeChildSelector,
          config.shapeOperationSelector,
          config.childLayerTurnsToWaitSelector,
          config.cellProbabilitySelector,
          config.cellSizeSelector()
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
          config.shapeRadiusSelector,
          config.cellSizeSelector(),
          config.regularPolygonSidesSelector()
        );
      }
      case LayerType.Background: {
        return new BackgroundLayer(this, config.cellColorSelector);
      }
      default: {
        throw Error(`Layer dispatcher can't render ${type} layers directly`);
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
