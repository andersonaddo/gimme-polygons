import p5 from "p5";
import { type ColorScheme } from "./types";
import { LayerDispatcher } from "./layerDispatcher";

export enum LayerType {
  Circle,
  Square,
}

export abstract class Layer {
  type: LayerType;
  colorScheme: ColorScheme;
  cellSize: number;
  layerDispatcher: LayerDispatcher;

  constructor(
    type: LayerType,
    cellSize: number,
    colorScheme: ColorScheme,
    layerDispatcher: LayerDispatcher
  ) {
    this.type = type;
    this.cellSize = cellSize;
    this.colorScheme = colorScheme;
    this.layerDispatcher = layerDispatcher;
  }

  abstract draw(p: p5): void;
}
