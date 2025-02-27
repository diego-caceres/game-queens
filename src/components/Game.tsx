"use client";
import { useCallback, useState } from "react";
import { Board } from "./Board";
import { ConfettiEffect } from "./ConfettiEffect";
import { CellStatus, ColorRegion, GameState } from "../types";
import {
  checkGameOver,
  findErrors,
  generateEmptyBoard,
  generateSolutionBoard,
} from "../gameLogic";

// Define color regions for an 8x8 board
const predefinedRegions: ColorRegion[] = [
  {
    id: 1,
    color: "bg-orange-200",
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ],
  },
  {
    id: 2,
    color: "bg-blue-300",
    cells: [
      { row: 0, col: 6 },
      { row: 0, col: 7 },
      { row: 1, col: 6 },
      { row: 1, col: 7 },
      { row: 2, col: 7 },

      { row: 3, col: 7 },
      { row: 4, col: 6 },
      { row: 4, col: 7 },
    ],
  },
  {
    id: 3,
    color: "bg-green-300",
    cells: [
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 3, col: 1 },
      { row: 4, col: 1 },
      { row: 4, col: 2 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
      { row: 4, col: 5 },
      { row: 5, col: 2 },
      { row: 5, col: 3 },
      { row: 5, col: 4 },
      { row: 5, col: 5 },
      { row: 6, col: 3 },
      { row: 6, col: 4 },
      { row: 6, col: 5 },
      { row: 7, col: 2 },
      { row: 7, col: 3 },
      { row: 7, col: 4 },
      { row: 7, col: 5 },
    ],
  },
  {
    id: 4,
    color: "bg-gray-200",
    cells: [
      { row: 2, col: 0 },
      { row: 3, col: 0 },
      { row: 4, col: 0 },
      { row: 5, col: 0 },
      { row: 6, col: 0 },
      { row: 7, col: 0 },
      { row: 7, col: 1 },
    ],
  },
  {
    id: 5,
    color: "bg-yellow-200",
    cells: [
      { row: 6, col: 1 },
      { row: 5, col: 1 },
      { row: 6, col: 2 },
    ],
  },
  {
    id: 6,
    color: "bg-red-400",
    cells: [
      { row: 5, col: 6 },
      { row: 5, col: 7 },
      { row: 6, col: 6 },
      { row: 6, col: 7 },
      { row: 7, col: 6 },
      { row: 7, col: 7 },
    ],
  },
  {
    id: 7,
    color: "bg-purple-400",
    cells: [
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 0, col: 5 },
      { row: 1, col: 3 },
      { row: 1, col: 4 },
      { row: 1, col: 5 },
    ],
  },
  {
    id: 8,
    color: "bg-pink-200",
    cells: [
      { row: 2, col: 5 },
      { row: 2, col: 6 },
      { row: 3, col: 2 },
      { row: 3, col: 3 },
      { row: 3, col: 4 },
      { row: 3, col: 5 },
      { row: 3, col: 6 },
    ],
  },
];

interface GameProps {
  size?: number;
}

export const Game: React.FC<GameProps> = ({ size = 8 }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const board = generateEmptyBoard(size, predefinedRegions);
    return {
      board,
      gameOver: false,
    };
  });

  const [showSolution, setShowSolution] = useState(false);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (gameState.gameOver) return;

      setGameState((prev) => {
        const newCells = JSON.parse(
          JSON.stringify(prev.board.cells)
        ) as CellStatus[][];

        // Toggle cell status: empty -> x -> queen -> empty
        if (newCells[row][col] === "empty") {
          newCells[row][col] = "x";
        } else if (newCells[row][col] === "x") {
          newCells[row][col] = "queen";
        } else {
          newCells[row][col] = "empty";
        }

        const newBoard = {
          ...prev.board,
          cells: newCells,
        };

        // Find errors
        newBoard.errors = findErrors(newBoard);

        // Check if game is over
        const isGameOver = checkGameOver(newBoard);

        return {
          board: newBoard,
          gameOver: isGameOver,
        };
      });
    },
    [gameState.gameOver]
  );

  const resetGame = useCallback(() => {
    setGameState({
      board: generateEmptyBoard(size, predefinedRegions),
      gameOver: false,
    });
    setShowSolution(false);
  }, [size]);

  const toggleSolution = useCallback(() => {
    setShowSolution((prev) => {
      if (!prev) {
        // When showing solution
        const solutionBoard = generateSolutionBoard(gameState.board);
        setGameState({
          board: solutionBoard,
          gameOver: true,
        });
      } else {
        // When hiding solution
        resetGame();
      }
      return !prev;
    });
  }, [gameState.board, resetGame]);

  return (
    <div className="flex flex-col items-center p-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Queens Game</h1>

      <div className="mb-6 bg-black p-4 rounded-lg border border-gray-700">
        <Board board={gameState.board} onCellClick={handleCellClick} />
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          className="px-6 py-3 bg-gray-200 text-black rounded-md hover:bg-gray-300"
          onClick={resetGame}
        >
          Reset
        </button>
        <button
          className="px-6 py-3 bg-blue-200 text-black rounded-md hover:bg-blue-300"
          onClick={toggleSolution}
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
      </div>

      {gameState.gameOver && (
        <div className="mt-4 text-green-600 font-bold text-lg">
          Congratulations! You completed the puzzle!
        </div>
      )}

      <ConfettiEffect active={gameState.gameOver && !showSolution} />

      <div className="mt-12 p-6 border border-gray-700 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">How to Play:</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li className="text-lg">
            Place exactly one Queen in each row, column, and color region
          </li>
          <li className="text-lg">Tap once to place X, twice for a Queen</li>
          <li className="text-lg">
            Two Queens cannot touch each other, not even diagonally
          </li>
          <li className="text-lg">
            Use X to mark where Queens cannot be placed
          </li>
        </ul>
      </div>
    </div>
  );
};
