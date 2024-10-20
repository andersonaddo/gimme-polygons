import p5 from "p5";
import { LayerDispatcher } from "../layerDispatcher";
import { Layer, LayerType } from "../layers";
import { ColorScheme } from "../types";
import {
  everyOtherSelector,
  perlinSelector,
} from "../selectors/cellProbabilitySelectors";

// TODO: start using declareFutureLayer for more fun designs
// TODO: parallelogram layer or figure out skew on a shape basis
export class RegularPolygonLayer extends Layer {
  constructor(
    colorScheme: ColorScheme,
    cellSize: number,
    dispatcher: LayerDispatcher
  ) {
    super(LayerType.Circle, cellSize, colorScheme, dispatcher);
  }

  draw(p: p5): void {
    const width = p.width;
    const height = p.height;

    // TODO: this should be passed in by the layer dispatcher
    const cellProbabilitySelector = perlinSelector(p, 3);
    // const cellProbabilitySelector = everyOtherSelector(4);

    // TODO: this should be passed in by the layer dispatcher
    const sides = 80;

    // right then up
    for (let x = 0; x < width; x += this.cellSize) {
      for (let y = 0; y < height; y += this.cellSize) {
        if (cellProbabilitySelector()) {
          // TODO: We should also give layers color selectors (from the dispatcher)
          //        For example prioritize or ristrict colors in the schemes
          // To clarify, they should only be given color selectors and should no longer see the color scheme
          p.fill(
            this.colorScheme.colors[
              Math.floor(p.random(this.colorScheme.colors.length))
            ]
          );

          const centerX = x + this.cellSize / 2;
          const centerY = y + this.cellSize / 2;
          const radius = p.random(10, this.cellSize / 2);
          const angularOffset = (Math.PI / sides) * 2; // best as 2 or 1
          p.beginShape();
          for (let i = 0; i < sides; i++) {
            p.vertex(
              centerX +
                radius * Math.cos(angularOffset + (i * 2 * Math.PI) / sides),
              centerY +
                radius * Math.sin(angularOffset + (i * 2 * Math.PI) / sides)
            );
          }
          p.endShape(p.CLOSE);
        }
      }
    }
  }
}
