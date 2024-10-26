import { LayerType } from "../layers";

export type LayerTypeSelector = () => LayerType

const polygonOrParallelogramTypeSelector = (polygonLayerChance: number): LayerTypeSelector => {
    return () => {
        return Math.random() < polygonLayerChance ? LayerType.RegularPolygon : LayerType.Parallelogram
    }
}

export const LayerTypeSelectors = { polygonOrParallelogramTypeSelector }