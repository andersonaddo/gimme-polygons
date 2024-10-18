import p5 from "p5"

export enum LayerType {
    Circle,
    Square,
}

export abstract class Layer {
    type: LayerType

    constructor(type: LayerType) {
        this.type = type
    }

    abstract draw(p: p5): void;
}

export interface Image {
    height: number
    width: number
    layers: Layer[]
}