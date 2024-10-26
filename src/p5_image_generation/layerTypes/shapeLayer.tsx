import p5 from "p5";
import { LayerDispatcher } from "../layerDispatcher";
import { Layer, LayerType } from "../layers";
import { Shape } from "../shape";
import { ColorSelector } from "../selectors/colorSelectors";

export class ShapeLayer extends Layer {
  shapes: Shape[]
  colorSelector: ColorSelector

  constructor(
    dispatcher: LayerDispatcher,
    shapes: Shape[],
    colorSelector: ColorSelector,
  ) {
    super(LayerType.RegularPolygon, dispatcher);
    this.shapes = shapes
    this.colorSelector = colorSelector
  }

  draw(p: p5): void {
    for (const shape of this.shapes) {
      shape.color = this.colorSelector()
      shape.draw(p)
    }
  }
}
