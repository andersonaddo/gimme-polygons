import { ColorScheme } from "./types";

// List of color schemes
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

export const getRandomColorScheme = () => {
    return COLOR_SCHEMES[Math.floor(Math.random() * COLOR_SCHEMES.length)]
}