import p5 from "p5";
import { LayerDispatcher } from "../layerDispatcher";
import { Layer, LayerType } from "../layers";
import { ColorSelector } from "../selectors/colorSelectors";

export class BackgroundLayer extends Layer {
  colorSelector: ColorSelector

  constructor(
    dispatcher: LayerDispatcher,
    colorSelector: ColorSelector,
  ) {
    super(LayerType.Background, dispatcher);
    this.colorSelector = colorSelector;
  }

  draw(p: p5) {
    p.background(this.colorSelector())
  }
}
