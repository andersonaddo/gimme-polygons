import p5 from "p5";
import { LayerDispatcher } from "../layerDispatcher";
import { Layer, LayerType } from "../layers";
import {
  BooleanSelector
} from "../selectors/booleanValueSelectors";
import { ColorSelector } from "../selectors/colorSelectors";
import { ShapeOperationSelector } from "../selectors/shapeOperationSelector";
import { ShapeLayer } from "./shapeLayer";
import { Shape } from "../shape";

// TODO: start using declareFutureLayer for more fun designs
// TODO: parallelogram layer or figure out skew on a shape basis
export class RegularPolygonLayer extends Layer {
  colorSelector: ColorSelector
  shapeOperationSelector: ShapeOperationSelector
  cellProbabilitySelector: BooleanSelector
  cellSize: number
  sides: number
  shapes: Shape[]

  constructor(
    dispatcher: LayerDispatcher,
    colorSelector: ColorSelector,
    shapeOperationSelector: ShapeOperationSelector,
    cellProbabilitySelector: BooleanSelector,
    cellSize: number,
    sides: number
  ) {
    super(LayerType.RegularPolygon, dispatcher);
    this.colorSelector = colorSelector
    this.shapeOperationSelector = shapeOperationSelector
    this.cellProbabilitySelector = cellProbabilitySelector
    this.cellSize = cellSize
    this.sides = sides
    this.shapes = []
  }

  // makeFutureLayer(shape: Shape) {
  //   const copiedShape = shape.copy()
  //   shape.operation = this.shapeOperationSelector()
  //   //TODO: move the colorSelector so that its passed by the layer dispatcher
  //   //TODO: have a way to make the turnsToWait param configurable
  //   const shapeLayer = new ShapeLayer(this.layerDispatcher, copiedShape, this.colorSelector)
  //   this.layerDispatcher.declareFutureLayer(shapeLayer, 3)
  // }

  draw(p: p5): void {
    const width = p.width;
    const height = p.height;

    for (let x = 0; x < width; x += this.cellSize) {
      for (let y = 0; y < height; y += this.cellSize) {
        if (this.cellProbabilitySelector()) {
          const centerX = x + this.cellSize / 2;
          const centerY = y + this.cellSize / 2;

          let vertices: p5.Vector[] = []

          // so there are multiple kinds of parallelogram grids
          // 1. Alternating skewed parallelograms, like wings
          // 2. One direction parallelograms, with custom width and height
          //      cell width and height? skew amount
          // LTRB
          vertices.push(new p5.Vector(x, y))
          vertices.push(new p5.Vector(x, y + this.cellSize * 0.7,))
          vertices.push(new p5.Vector(x + this.cellSize, y + this.cellSize * 0.7,))
          vertices.push(new p5.Vector(x + this.cellSize, y + this.cellSize))

          let shape: Shape = new Shape(
            new p5.Vector(centerX, centerY),
            vertices,
            this.colorSelector()
          )

          shape.draw(p)
          this.shapes.push(shape)

          //TODO: make use of makeFutureLayer
        }
      }
    }
  }
}
