import { ShapeOperation } from "../shape";

export type ShapeOperationSelector = () => ShapeOperation

const randomOperationSelector = (): ShapeOperationSelector => {
    return () => {
        const enumLength = Object.values(ShapeOperation).length / 2
        return Math.floor(Math.random() * enumLength)
    }
}

export const ShapeOperationSelectors = { randomOperationSelector }