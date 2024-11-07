import p5 from "p5";

export type NumericValueSelector = () => number;

const constantNumberSelector = (x: number): NumericValueSelector => {
  return () => x;
};

// Returns a function that returns a random value returns a random number
// from the first argument up to (but not including) the second argument.
const boundRandomSelector = (
  p: p5,
  lower: number,
  upper: number
): NumericValueSelector => {
  return () => {
    return p.random() * (upper - lower) + lower;
  };
};

export const NumericValueSelectors = {
  constantNumberSelector,
  boundRandomSelector,
};
