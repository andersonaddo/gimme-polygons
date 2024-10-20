import { type Layer } from "./layers"


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

// A representation of a shape that is being drawn by p5 in a layer 
//      to be used to pass around shape information between layers
export interface Shape{
    func : Function
    parameters : number[]
}