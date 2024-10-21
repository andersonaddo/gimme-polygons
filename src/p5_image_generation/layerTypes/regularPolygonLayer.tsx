import p5 from "p5";
import { LayerDispatcher } from "../layerDispatcher";
import { Layer, LayerType } from "../layers";
import {
  BooleanSelector
} from "../selectors/booleanValueSelectors";
import { ColorSelector } from "../selectors/colorSelectors";

// TODO: start using declareFutureLayer for more fun designs
// TODO: parallelogram layer or figure out skew on a shape basis
export class RegularPolygonLayer extends Layer {
  colorSelector: ColorSelector
  cellProbabilitySelector: BooleanSelector
  cellSize: number
  sides: number

  constructor(
    dispatcher: LayerDispatcher,
    colorSelector: ColorSelector,
    cellProbabilitySelector: BooleanSelector,
    cellSize: number,
    sides: number
  ) {
    super(LayerType.RegularPolygon, dispatcher);
    this.colorSelector = colorSelector
    this.cellProbabilitySelector = cellProbabilitySelector
    this.cellSize = cellSize
    this.sides = sides
  }

  draw(p: p5): void {
    const width = p.width;
    const height = p.height;

    for (let x = 0; x < width; x += this.cellSize) {
      for (let y = 0; y < height; y += this.cellSize) {
        if (this.cellProbabilitySelector()) {
          p.fill(this.colorSelector());
          const centerX = x + this.cellSize / 2;
          const centerY = y + this.cellSize / 2;
          const angularOffset = (Math.PI / this.sides) * 2; // best as 2 or 1

          const radius = p.random(10, this.cellSize / 2);

          p.beginShape();
          for (let i = 0; i < this.sides; i++) {
            p.vertex(
              centerX +
              radius * Math.cos(angularOffset + (i * 2 * Math.PI) / this.sides),
              centerY +
              radius * Math.sin(angularOffset + (i * 2 * Math.PI) / this.sides)
            );
          }
          p.endShape(p.CLOSE);
        }
      }
    }
  }
}
