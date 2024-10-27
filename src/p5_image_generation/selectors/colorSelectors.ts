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

const randomColorSelector = (p: p5, colorScheme: ColorScheme): ColorSelector => {
  return () => colorScheme.colors[
    Math.floor(p.random(colorScheme.colors.length))
  ]
}

const baseColorSelector = (p: p5, colorScheme: ColorScheme): ColorSelector => {
  return () => colorScheme.colors[
    Math.floor(p.random(3))
  ]
}

const accentColorSelector = (p: p5, colorScheme: ColorScheme): ColorSelector => {
  return () => colorScheme.colors[
    Math.floor(p.random(3, 5))
  ]
}

/**
 * returns a function that randomly returns a color based on perlin noise
 * @param smoothingFactor the greater the division the smoother the noise
 */
const perlinColorSelector = (p: p5, colorScheme: ColorScheme, smoothingFactor: number): ColorSelector => {
  let counter = p.random() * 10;
  return () => {
    counter += 1 * smoothingFactor;
    const noiseValue = p.noise(counter);
    const colorIndex = Math.floor(noiseValue * colorScheme.colors.length);
    return colorScheme.colors[colorIndex];
  }
}

export const ColorSelectors = { randomColorSelector, baseColorSelector, accentColorSelector, perlinColorSelector }
