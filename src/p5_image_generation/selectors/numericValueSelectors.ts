export type NumericValueSelector = () => number;

const constantNumberSelector = (x: number): NumericValueSelector => {
  return () => x;
};

// Returns a function that returns a random value returns a random number
// from the first argument up to (but not including) the second argument.
const boundRandomSelector = (
  lower: number,
  upper: number
): NumericValueSelector => {
  return () => {
    return Math.random() * (upper - lower) + lower;
  };
};

export const NumericValueSelectors = {
  constantNumberSelector,
  boundRandomSelector,
};