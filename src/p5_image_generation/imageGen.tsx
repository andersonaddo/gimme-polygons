import { getRandomColorScheme } from "./colors"
import { CircleLayer } from "./layers"
import { Image } from "./types"

export const generateImageDefinition = (width: number, height: number): Image => {
    const colorScheme = getRandomColorScheme()
    return {
        height,
        width,
        layers: [
            new CircleLayer(colorScheme),
            new CircleLayer(colorScheme),
            new CircleLayer(colorScheme),
        ]
    }
}