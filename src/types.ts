export type CellStatus = "empty" | "x" | "queen";

export type CellPosition = {
  row: number;
  col: number;
};

export type ColorRegion = {
  id: number;
  color: string;
  cells: CellPosition[];
};

export type BoardState = {
  size: number;
  cells: CellStatus[][];
  regions: ColorRegion[];
  errors: CellPosition[];
};

export type GameState = {
  board: BoardState;
  gameOver: boolean;
};
