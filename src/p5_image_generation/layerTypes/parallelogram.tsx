import p5 from "p5";
import { LayerDispatcher } from "../layerDispatcher";
import { Layer, LayerType } from "../layers";
import { BooleanSelector } from "../selectors/booleanValueSelectors";
import { ColorSelector } from "../selectors/colorSelectors";
import { ShapeOperationSelector } from "../selectors/shapeOperationSelector";
import { Shape } from "../shape";

export class ParallelogramLayer extends Layer {
  colorSelector: ColorSelector;
  shapeOperationSelector: ShapeOperationSelector;
  cellProbabilitySelector: BooleanSelector;
  cellSize: number;
  shapes: Shape[];
  skewAmount: number;

  constructor(
    dispatcher: LayerDispatcher,
    colorSelector: ColorSelector,
    shapeOperationSelector: ShapeOperationSelector,
    cellProbabilitySelector: BooleanSelector,
    cellSize: number
  ) {
    super(LayerType.Parallelogram, dispatcher);
    this.colorSelector = colorSelector;
    this.shapeOperationSelector = shapeOperationSelector;
    this.cellProbabilitySelector = cellProbabilitySelector;
    this.cellSize = cellSize;
    this.shapes = [];
    this.skewAmount = 0.3;
  }

  draw(p: p5): void {
    const width = p.width;
    const height = p.height;
    let dir: boolean = true;

    for (let x = 0; x < width; x += this.cellSize) {
      for (let y = 0; y < height; y += this.cellSize) {
        if (this.cellProbabilitySelector()) {
          const centerX = x + this.cellSize / 2;
          const centerY = y + this.cellSize / 2;

          let vertices: p5.Vector[] = [];

          // TODO: better parametize the directions of the parallelograms
          //    I'm thinking column alternate, all same
          if (dir) {
            vertices.push(
              new p5.Vector(x, y + this.cellSize * this.skewAmount)
            );
            vertices.push(new p5.Vector(x, y + this.cellSize));
            vertices.push(
              new p5.Vector(
                x + this.cellSize,
                y + this.cellSize * (1 - this.skewAmount)
              )
            );
            vertices.push(new p5.Vector(x + this.cellSize, y));
          } else {
            vertices.push(
              new p5.Vector(
                x + this.cellSize,
                y + this.cellSize * this.skewAmount
              )
            );
            vertices.push(new p5.Vector(x + this.cellSize, y + this.cellSize));
            vertices.push(
              new p5.Vector(x, y + this.cellSize * (1 - this.skewAmount))
            );
            vertices.push(new p5.Vector(x, y));
          }

          dir = !dir;
          let shape: Shape = new Shape(
            new p5.Vector(centerX, centerY),
            vertices,
            this.colorSelector()
          );
          shape.draw(p);
          this.shapes.push(shape);
        }
      }
    }
  }
}
