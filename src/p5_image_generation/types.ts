import { type Layer } from "./layers"

export interface Image {
    layers: Layer[]
}

// TODO: we should maybe introduce the concept of main colors and accent colors
// The order of the colors in the colors array can communicate that for now
export interface ColorScheme<T extends string = string> {
    name: T
    colors: readonly [string, string, string, string, string]
}