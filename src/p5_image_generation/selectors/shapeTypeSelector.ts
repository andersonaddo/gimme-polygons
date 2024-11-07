import p5 from "p5";
import { LayerType } from "../layers";

export type LayerTypeSelector = () => LayerType

const polygonOrParallelogramTypeSelector = (p: p5, polygonLayerChance: number): LayerTypeSelector => {
    return () => {
        return p.random() < polygonLayerChance ? LayerType.RegularPolygon : LayerType.Parallelogram
    }
}

export const LayerTypeSelectors = { polygonOrParallelogramTypeSelector }