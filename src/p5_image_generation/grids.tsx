import { CircleLayer } from "./layers"
import { Image } from "./types"

export const makeLayers = (): Image => {
    return {
        height: 300,
        width: 1000,
        layers: [
            new CircleLayer(),
            new CircleLayer(),
            new CircleLayer(),
        ]
    }
}