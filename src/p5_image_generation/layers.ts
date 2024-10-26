import p5 from "p5";
import { LayerDispatcher } from "./layerDispatcher";

export enum LayerType {
  RegularPolygon,
  Shape,
  Parallelogram
}

export abstract class Layer {
  type: LayerType;
  layerDispatcher: LayerDispatcher;

  constructor(
    type: LayerType,
    layerDispatcher: LayerDispatcher
  ) {
    this.type = type;
    this.layerDispatcher = layerDispatcher;
  }

  abstract draw(p: p5): void;
}
