export type CellSizeSelector = () => number;

export function getStandardCellSizeSelector(): CellSizeSelector {
  return () => {
    return 200;
  };
}
