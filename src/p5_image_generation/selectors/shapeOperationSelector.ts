import p5 from "p5";
import { ShapeOperation } from "../shape";

export type ShapeOperationSelector = () => ShapeOperation

const randomOperationSelector = (p: p5): ShapeOperationSelector => {
    return () => {
        const enumLength = Object.values(ShapeOperation).length / 2
        return Math.floor(p.random() * enumLength)
    }
}

export const ShapeOperationSelectors = { randomOperationSelector }