export type NumericValueSelector = () => number

const constantNumberSelector = (x: number): NumericValueSelector => {
    return () => x
}

export const NumericValueSelectors = { constantNumberSelector }