import { LayerDispatcher, LayerDispatcherConfig } from "../layerDispatcher";
import { ShapeOperationSelector } from "../selectors/shapeOperationSelector";
import { Shape } from "../shape";
import { ShapeLayer } from "./shapeLayer";

export const deriveShapeLayerGenerator = (layerDispatcher: LayerDispatcher, referenceShapes: Shape[], shapeOperationSelector?: ShapeOperationSelector) => {
    const copiedShapes: Shape[] = [];

    for (const shape of referenceShapes) {
        const copiedShape = shape.copy();
        copiedShape.operation = shapeOperationSelector?.();
        copiedShapes.push(copiedShape);
    }

    const layerGenerator = (config: LayerDispatcherConfig) => {
        const shapeLayer = new ShapeLayer(
            layerDispatcher,
            copiedShapes,
            config.cellColorSelector
        );
        return shapeLayer
    }

    return layerGenerator
}