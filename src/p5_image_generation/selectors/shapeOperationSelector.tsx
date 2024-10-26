import { ShapeOperation } from "../shape";

export type ShapeOperationSelector = () => ShapeOperation

export const randomOperationSelector = (): ShapeOperationSelector => {
    return () => {
        const values = Object.keys(ShapeOperation).map(parseInt);
        const enumKey = values[Math.floor(Math.random() * values.length)]
        return enumKey
    }
}
