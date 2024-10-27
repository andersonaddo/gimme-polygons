import { LayerDispatcher, LayerDispatcherConfig } from "../layerDispatcher";
import { Shape, ShapeOperation } from "../shape";
import { ShapeLayer } from "./shapeLayer";

export const deriveShapeLayerGenerator = (layerDispatcher: LayerDispatcher, referenceShapes: Shape[], shapeOperation?: ShapeOperation) => {
    const copiedShapes: Shape[] = [];

    for (const shape of referenceShapes) {
        const copiedShape = shape.copy();
        copiedShape.operation = shapeOperation;
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