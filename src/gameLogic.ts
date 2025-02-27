import { BoardState, CellPosition, CellStatus, ColorRegion } from "./types";

// Check if a queen can be placed at a specific position
export const canPlaceQueen = (
  board: BoardState,
  row: number,
  col: number
): boolean => {
  const { cells, size } = board;

  // Check if the position already has a queen
  if (cells[row][col] === "queen") {
    return false;
  }

  // Check row
  for (let c = 0; c < size; c++) {
    if (c !== col && cells[row][c] === "queen") {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < size; r++) {
    if (r !== row && cells[r][col] === "queen") {
      return false;
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
    if (cells[r][c] === "queen") {
      return false;
    }
  }
  for (let r = row + 1, c = col + 1; r < size && c < size; r++, c++) {
    if (cells[r][c] === "queen") {
      return false;
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let r = row - 1, c = col + 1; r >= 0 && c < size; r--, c++) {
    if (cells[r][c] === "queen") {
      return false;
    }
  }
  for (let r = row + 1, c = col - 1; r < size && c >= 0; r--, c--) {
    if (cells[r][c] === "queen") {
      return false;
    }
  }

  // Check adjacent cells (including diagonals)
  const adjacentPositions = [
    { r: row - 1, c: col - 1 },
    { r: row - 1, c: col },
    { r: row - 1, c: col + 1 },
    { r: row, c: col - 1 },
    { r: row, c: col + 1 },
    { r: row + 1, c: col - 1 },
    { r: row + 1, c: col },
    { r: row + 1, c: col + 1 },
  ];

  for (const pos of adjacentPositions) {
    if (pos.r >= 0 && pos.r < size && pos.c >= 0 && pos.c < size) {
      if (cells[pos.r][pos.c] === "queen") {
        return false;
      }
    }
  }

  // Check if there's already a queen in the same color region
  const region = getRegionForCell(board.regions, row, col);
  if (region) {
    for (const cell of region.cells) {
      if (cell.row !== row || cell.col !== col) {
        if (cells[cell.row][cell.col] === "queen") {
          return false;
        }
      }
    }
  }

  return true;
};

// Get the color region for a cell
export const getRegionForCell = (
  regions: ColorRegion[],
  row: number,
  col: number
): ColorRegion | undefined => {
  return regions.find((region) =>
    region.cells.some((cell) => cell.row === row && cell.col === col)
  );
};

// Check for errors after placing a queen
export const findErrors = (board: BoardState): CellPosition[] => {
  const { cells, size, regions } = board;
  const errors: CellPosition[] = [];
  const queens: CellPosition[] = [];

  // Find all queens
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (cells[r][c] === "queen") {
        queens.push({ row: r, col: c });
      }
    }
  }

  // Check for multiple queens in rows
  for (let r = 0; r < size; r++) {
    const queensInRow = queens.filter((q) => q.row === r);
    if (queensInRow.length > 1) {
      queensInRow.forEach((q) => errors.push(q));
    }
  }

  // Check for multiple queens in columns
  for (let c = 0; c < size; c++) {
    const queensInCol = queens.filter((q) => q.col === c);
    if (queensInCol.length > 1) {
      queensInCol.forEach((q) => errors.push(q));
    }
  }

  // Check for queens in the same region
  regions.forEach((region) => {
    const queensInRegion = queens.filter((q) =>
      region.cells.some((cell) => cell.row === q.row && cell.col === q.col)
    );
    if (queensInRegion.length > 1) {
      queensInRegion.forEach((q) => errors.push(q));
    }
  });

  // Check for adjacent queens (including diagonals)
  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      const q1 = queens[i];
      const q2 = queens[j];
      const rowDiff = Math.abs(q1.row - q2.row);
      const colDiff = Math.abs(q1.col - q2.col);

      // Queens are adjacent or diagonal to each other
      if (rowDiff <= 1 && colDiff <= 1) {
        errors.push(q1);
        errors.push(q2);
      }

      // Queens are on the same diagonal
      if (rowDiff === colDiff) {
        errors.push(q1);
        errors.push(q2);
      }
    }
  }

  // Remove duplicates
  return errors.filter(
    (error, index, self) =>
      index ===
      self.findIndex((e) => e.row === error.row && e.col === error.col)
  );
};

// Check if the game is over (all rules satisfied)
export const checkGameOver = (board: BoardState): boolean => {
  const { cells, size, regions } = board;
  const queens: CellPosition[] = [];

  // Find all queens
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (cells[r][c] === "queen") {
        queens.push({ row: r, col: c });
      }
    }
  }

  // Check if there's exactly one queen in each row
  for (let r = 0; r < size; r++) {
    const queensInRow = queens.filter((q) => q.row === r);
    if (queensInRow.length !== 1) {
      return false;
    }
  }

  // Check if there's exactly one queen in each column
  for (let c = 0; c < size; c++) {
    const queensInCol = queens.filter((q) => q.col === c);
    if (queensInCol.length !== 1) {
      return false;
    }
  }

  // Check if there's exactly one queen in each region
  for (const region of regions) {
    const queensInRegion = queens.filter((q) =>
      region.cells.some((cell) => cell.row === q.row && cell.col === q.col)
    );
    if (queensInRegion.length !== 1) {
      return false;
    }
  }

  // Check for errors
  const errors = findErrors(board);
  if (errors.length > 0) {
    return false;
  }

  return true;
};

// Generate an empty board
export const generateEmptyBoard = (
  size: number,
  regions: ColorRegion[]
): BoardState => {
  const cells: CellStatus[][] = [];
  for (let r = 0; r < size; r++) {
    cells.push(Array(size).fill("empty"));
  }

  return {
    size,
    cells,
    regions,
    errors: [],
  };
};

// Generate a solution board
export const generateSolutionBoard = (board: BoardState): BoardState => {
  // This is a placeholder for the actual algorithm
  // For now, we'll provide a hardcoded solution for an 8x8 board
  const solution: BoardState = {
    ...board,
    cells: JSON.parse(JSON.stringify(board.cells)), // Deep copy
    errors: [],
  };

  // Sample solution positions for an 8x8 board following game rules
  const queenPositions: CellPosition[] = [
    { row: 0, col: 2 }, // Region 1: Orange
    { row: 1, col: 5 }, // Region 2: Purple
    { row: 2, col: 7 }, // Region 3: Blue
    { row: 3, col: 3 }, // Region 4: Pink
    { row: 4, col: 0 }, // Region 5: Gray
    { row: 5, col: 6 }, // Region 6: Red
    { row: 6, col: 1 }, // Region 7: Yellow
    { row: 7, col: 4 }, // Region 8: Pink
  ];

  // Place queens on the solution board
  for (const { row, col } of queenPositions) {
    if (row < solution.size && col < solution.size) {
      solution.cells[row][col] = "queen";
    }
  }

  return solution;
};
