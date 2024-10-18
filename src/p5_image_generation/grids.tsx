import { CircleLayer } from "./layers"
import { Image } from "./types"

export const generateImageDefinition = (width: number, height: number): Image => {
    return {
        height,
        width,
        layers: [
            new CircleLayer(),
            new CircleLayer(),
            new CircleLayer(),
        ]
    }
}