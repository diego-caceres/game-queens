export type CellState = "empty" | "marked" | "queen";

export interface Cell {
  state: CellState;
  color: number;
  hasError?: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  size: number;
  colors: string[];
  initialColorLayout: number[][];
  solution: Position[];
}
