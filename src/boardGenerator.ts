import { BoardState, CellPosition, ColorRegion } from "./types";
import { canPlaceQueen } from "./gameLogic";

export const generateRandomBoard = (
  size: number,
  regions: ColorRegion[]
): BoardState => {
  // Start with an empty board
  const board: BoardState = {
    size,
    cells: Array(size)
      .fill(null)
      .map(() => Array(size).fill("empty")),
    regions,
    errors: [],
  };

  // Try to place queens randomly, following the rules
  const queens: CellPosition[] = [];
  let attempts = 0;
  const maxAttempts = 1000;

  while (queens.length < size && attempts < maxAttempts) {
    attempts++;

    // Try to place a new queen
    const positions: CellPosition[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Check if we can place a queen here
        if (canPlaceQueen(board, r, c)) {
          positions.push({ row: r, col: c });
        }
      }
    }

    if (positions.length === 0) {
      // No valid positions, reset and try again
      queens.length = 0;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          board.cells[r][c] = "empty";
        }
      }
      continue;
    }

    // Choose a random position
    const randomIndex = Math.floor(Math.random() * positions.length);
    const position = positions[randomIndex];

    // Place the queen
    board.cells[position.row][position.col] = "queen";
    queens.push(position);
  }

  // If we couldn't place all queens, use a fallback solution
  if (queens.length < size) {
    return generateFallbackBoard(size, regions);
  }

  // Reset board to be empty for play
  const playBoard = {
    ...board,
    cells: Array(size)
      .fill(null)
      .map(() => Array(size).fill("empty")),
  };

  return playBoard;
};

const generateFallbackBoard = (
  size: number,
  regions: ColorRegion[]
): BoardState => {
  // Implement a more deterministic approach
  // For the time being, return a standard empty board
  return {
    size,
    cells: Array(size)
      .fill(null)
      .map(() => Array(size).fill("empty")),
    regions,
    errors: [],
  };
};
