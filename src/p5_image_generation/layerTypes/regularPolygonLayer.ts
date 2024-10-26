import p5 from "p5";
import { LayerDispatcher } from "../layerDispatcher";
import { Layer, LayerType } from "../layers";
import { BooleanSelector } from "../selectors/booleanValueSelectors";
import { ColorSelector } from "../selectors/colorSelectors";
import { ShapeOperationSelector } from "../selectors/shapeOperationSelector";
import { ShapeLayer } from "./shapeLayer";
import { Shape } from "../shape";
import { NumericValueSelector } from "../selectors/numericValueSelectors";

export class RegularPolygonLayer extends Layer {
  colorSelector: ColorSelector;
  shouldMakeChildSelector: BooleanSelector;
  shapeOperationSelector: ShapeOperationSelector;
  childTurnsToWaitSelector: NumericValueSelector;
  cellProbabilitySelector: BooleanSelector;
  cellSize: number;
  sides: number;
  shapes: Shape[];

  constructor(
    p: p5,
    dispatcher: LayerDispatcher,
    colorSelector: ColorSelector,
    shouldMakeChildSelector: BooleanSelector,
    shapeOperationSelector: ShapeOperationSelector,
    childTurnsToWaitSelector: NumericValueSelector,
    cellProbabilitySelector: BooleanSelector,
    cellSize: number,
    sides: number
  ) {
    super(LayerType.RegularPolygon, dispatcher);
    this.colorSelector = colorSelector;
    this.shouldMakeChildSelector = shouldMakeChildSelector;
    this.shapeOperationSelector = shapeOperationSelector;
    this.cellProbabilitySelector = cellProbabilitySelector;
    this.childTurnsToWaitSelector = childTurnsToWaitSelector
    this.cellSize = cellSize;
    this.sides = sides;
    this.shapes = [];

    this.defineShapeToDraw(p)
  }

  makeFutureLayer() {
    const operation = this.shapeOperationSelector();
    const copiedShapes = [];

    for (const shape of this.shapes) {
      const copiedShape = shape.copy();
      copiedShape.operation = operation;
      copiedShapes.push(copiedShape);
    }

    //TODO: move the colorSelector so that its passed by the layer dispatcher
    const shapeLayer = new ShapeLayer(
      this.layerDispatcher,
      copiedShapes,
      this.colorSelector
    );
    this.layerDispatcher.declareFutureLayer(shapeLayer, this.childTurnsToWaitSelector());
  }

  defineShapeToDraw(p: p5) {
    const width = p.width;
    const height = p.height;

    for (let x = 0; x < width; x += this.cellSize) {
      for (let y = 0; y < height; y += this.cellSize) {
        if (this.cellProbabilitySelector()) {
          const centerX = x + this.cellSize / 2;
          const centerY = y + this.cellSize / 2;
          const angularOffset = (Math.PI / this.sides) * 2; // best as 2 or 1
          const radius = p.random(10, this.cellSize / 2);

          let vertices: p5.Vector[] = [];

          for (let i = 0; i < this.sides; i++) {
            let x =
              centerX +
              radius * Math.cos(angularOffset + (i * 2 * Math.PI) / this.sides);
            let y =
              centerY +
              radius * Math.sin(angularOffset + (i * 2 * Math.PI) / this.sides);
            p.vertex(x, y);
            vertices.push(new p5.Vector(x, y));
          }

          let shape: Shape = new Shape(
            new p5.Vector(centerX, centerY),
            vertices,
            this.colorSelector()
          );

          this.shapes.push(shape);
        }
      }
    }

    if (this.shouldMakeChildSelector()) {
      this.makeFutureLayer();
    }
  }

  draw(p: p5) {
    this.shapes.forEach(shape => {
      shape.draw(p)
    })
  }
}
