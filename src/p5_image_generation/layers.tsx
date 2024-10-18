import p5 from "p5";
import { Layer, LayerType } from "./types";

export class CircleLayer extends Layer {
    constructor() {
        super(LayerType.Circle)
    }

    draw(p: p5): void {
        const width = p.width
        const height = p.height
        const radius = p.random(20, Math.min(width, height))

        p.fill(p.random(255), p.random(255), p.random(255))
        p.circle(width / 2, height / 2, radius);
    }
}
