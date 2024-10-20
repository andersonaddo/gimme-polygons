import p5 from "p5"

export enum LayerType {
    Circle,
    Square,
}

export interface Image {
    height: number
    width: number
    layers: Layer[]
}

// TODO: we should maybe introduce the concept of main colors and accent colors
// The order of the colors in the colors array can communicate that for now
export interface ColorScheme {
    name: string
    colors: string[]
}

export abstract class Layer {
    type: LayerType
    colorScheme: ColorScheme

    constructor(type: LayerType, colorScheme: ColorScheme) {
        this.type = type
        this.colorScheme = colorScheme
    }

    abstract draw(p: p5): void;
}

