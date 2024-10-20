import p5 from "p5";
import { ColorScheme, Layer, LayerType } from "./types";

export class CircleLayer extends Layer {
    constructor(colorScheme: ColorScheme) {
        super(LayerType.Circle, colorScheme)
    }

    draw(p: p5): void {
        const width = p.width
        const height = p.height
        const cellSize = 50;

        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
            if (p.random() > 0.5) { 
                p.fill(this.colorScheme.colors[Math.floor(p.random(this.colorScheme.colors.length))])
                const circleRadius = p.random(10, cellSize / 2);
                p.circle(x + cellSize / 2, y + cellSize / 2, circleRadius);
            }
            }
        }        
    }
}
