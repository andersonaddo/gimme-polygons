import p5 from "p5";
import { ColorScheme } from "../types";

export const DEBUG_COLOR_SCHEME: ColorScheme = {
  name: "DEBUG",
  colors: ["lightgrey", "grey", "white", "red", "yellow"]
}

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: "Ocean",
    colors: ["#1B3B6F", "#1F7A8C", "#BFDBF7", "#E1E5F2", "#F0F5F9"]
  },
  {
    name: "Sunset",
    colors: ["#FF5E5B", "#D8A47F", "#FFED66", "#6A0572", "#AB83A1"]
  },
  {
    name: "Forest",
    colors: ["#2E4600", "#486B00", "#A2C523", "#7D4427", "#D9BF77"]
  },
  {
    name: "Desert",
    colors: ["#D9BF77", "#E3CDA4", "#C77966", "#A84448", "#6A2E35"]
  },
  {
    name: "Pastel",
    colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"]
  }
];


export type ColorSelector = () => string

export const randomColorSelector = (p: p5, colorScheme: ColorScheme): ColorSelector => {
  return () => colorScheme.colors[
    Math.floor(p.random(colorScheme.colors.length))
  ]
}

export const baseColorSelector = (p: p5, colorScheme: ColorScheme): ColorSelector => {
  return () => colorScheme.colors[
    Math.floor(p.random(3))
  ]
}

export const accentColorSelector = (p: p5, colorScheme: ColorScheme): ColorSelector => {
  return () => colorScheme.colors[
    Math.floor(p.random(3, 5))
  ]
}
