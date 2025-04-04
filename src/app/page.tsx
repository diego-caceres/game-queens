"use client";

import { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";
import { GameBoard } from "../components/GameBoard";
import { Header } from "../components/Header";
import { Timer } from "../components/Timer";
import { DeveloperTools } from "../components/DeveloperTools";
import { HowToPlay } from "../components/HowToPlay";
import { Examples } from "../components/Examples";
import { ActionButtons } from "../components/ActionButtons";
import { Cell, Position, GameConfig } from "../components/types";

export default function Home() {
  // Game configuration
  const gameConfig: GameConfig = {
    size: 8, // 8x8 board
    colors: [
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-green-200", // Light green
      "bg-rose-300", // Light red/salmon
      "bg-purple-200", // Light purple
      "bg-yellow-200", // Light yellow
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 2, 2, 2],
      [1, 1, 3, 3, 3, 3, 2, 2],
      [7, 3, 3, 3, 3, 3, 3, 2],
      [7, 7, 4, 4, 4, 5, 5, 2],
      [7, 7, 4, 4, 4, 5, 5, 5],
      [7, 7, 4, 6, 6, 5, 5, 5],
      [7, 6, 6, 6, 6, 8, 8, 5],
      [7, 6, 6, 6, 8, 8, 8, 8],
    ],
    solution: [
      { row: 0, col: 3 }, // color 1
      { row: 1, col: 7 }, // color 2
      { row: 2, col: 4 }, // color 3
      { row: 3, col: 2 }, // color 4
      { row: 4, col: 6 }, // color 5
      { row: 5, col: 3 }, // color 6
      { row: 6, col: 0 }, // color 7
      { row: 7, col: 5 }, // color 8
    ],
  };

  // Confetti configuration
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 100,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  // Game state
  const [board, setBoard] = useState<Cell[][]>([]);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showDevTools, setShowDevTools] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(false);

  // Initialize board
  useEffect(() => {
    const newBoard: Cell[][] = Array(gameConfig.size)
      .fill(null)
      .map(() =>
        Array(gameConfig.size)
          .fill(null)
          .map(() => ({ state: "empty", color: 0, hasError: false }))
      );

    // Apply color layout
    for (let row = 0; row < gameConfig.size; row++) {
      for (let col = 0; col < gameConfig.size; col++) {
        newBoard[row][col].color = gameConfig.initialColorLayout[row][col];
      }
    }

    setBoard(newBoard);
    setTimerActive(true);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerActive && !hasWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, hasWon]);

  // Format timer as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Check for conflicts and mark cells with errors
  const checkForConflicts = (currentBoard: Cell[][]): Cell[][] => {
    // Create a deep copy of the board to avoid reference issues
    const boardCopy: Cell[][] = JSON.parse(JSON.stringify(currentBoard));

    // Reset all error states first
    for (let row = 0; row < gameConfig.size; row++) {
      for (let col = 0; col < gameConfig.size; col++) {
        boardCopy[row][col].hasError = false;
      }
    }

    // Find all queens
    const queensPositions: Position[] = [];
    const queensByColor: { [key: number]: Position[] } = {};
    const queensByRow: { [key: number]: Position[] } = {};
    const queensByCol: { [key: number]: Position[] } = {};

    for (let row = 0; row < gameConfig.size; row++) {
      for (let col = 0; col < gameConfig.size; col++) {
        if (boardCopy[row][col].state === "queen") {
          const position = { row, col };
          queensPositions.push(position);

          // Group by color
          const colorIdx = boardCopy[row][col].color;
          if (!queensByColor[colorIdx]) queensByColor[colorIdx] = [];
          queensByColor[colorIdx].push(position);

          // Group by row
          if (!queensByRow[row]) queensByRow[row] = [];
          queensByRow[row].push(position);

          // Group by column
          if (!queensByCol[col]) queensByCol[col] = [];
          queensByCol[col].push(position);
        }
      }
    }

    // Mark conflicts by color (more than one queen in same color area)
    Object.values(queensByColor).forEach((positions) => {
      if (positions.length > 1) {
        positions.forEach((pos) => {
          boardCopy[pos.row][pos.col].hasError = true;
        });
      }
    });

    // Mark conflicts by row (more than one queen in same row)
    Object.values(queensByRow).forEach((positions) => {
      if (positions.length > 1) {
        positions.forEach((pos) => {
          boardCopy[pos.row][pos.col].hasError = true;
        });
      }
    });

    // Mark conflicts by column (more than one queen in same column)
    Object.values(queensByCol).forEach((positions) => {
      if (positions.length > 1) {
        positions.forEach((pos) => {
          boardCopy[pos.row][pos.col].hasError = true;
        });
      }
    });

    // Mark diagonal conflicts
    for (let i = 0; i < queensPositions.length; i++) {
      for (let j = i + 1; j < queensPositions.length; j++) {
        const q1 = queensPositions[i];
        const q2 = queensPositions[j];

        // Check if queens are diagonally adjacent
        if (Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col)) {
          boardCopy[q1.row][q1.col].hasError = true;
          boardCopy[q2.row][q2.col].hasError = true;
        }
      }
    }

    return boardCopy;
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number): void => {
    if (hasWon) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];

    // Cycle through states: empty -> marked -> queen -> empty
    switch (cell.state) {
      case "empty":
        cell.state = "marked";
        break;
      case "marked":
        cell.state = "queen";
        break;
      case "queen":
        cell.state = "empty";
        break;
    }

    // Check for conflicts and mark errors
    const boardWithConflicts = checkForConflicts(newBoard);
    setBoard(boardWithConflicts);

    // Check win condition
    checkWinCondition(boardWithConflicts);
  };

  // Reset the board
  const handleClear = (): void => {
    const newBoard = [...board];
    for (let row = 0; row < gameConfig.size; row++) {
      for (let col = 0; col < gameConfig.size; col++) {
        newBoard[row][col].state = "empty";
        newBoard[row][col].hasError = false;
      }
    }
    setBoard(newBoard);
    setHasWon(false);
    setTimer(0);
    setTimerActive(true);
  };

  // Show solution (for development)
  const handleShowSolution = (): void => {
    const newBoard = [...board];

    // First clear the board
    for (let row = 0; row < gameConfig.size; row++) {
      for (let col = 0; col < gameConfig.size; col++) {
        newBoard[row][col].state = "empty";
        newBoard[row][col].hasError = false;
      }
    }

    // Place queens according to the solution
    gameConfig.solution.forEach((pos) => {
      newBoard[pos.row][pos.col].state = "queen";
    });

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  // Toggle developer tools
  const toggleDevTools = (): void => {
    setShowDevTools(!showDevTools);
  };

  // Undo button placeholder (would need move history to implement fully)
  const handleUndo = (): void => {
    // This would require tracking move history
    alert("Undo feature would require move history tracking");
  };

  // Hint button placeholder
  const handleHint = (): void => {
    // Simple hint implementation
    const newBoard = [...board];

    // Find a random empty cell where a queen should be placed
    const emptyCorrectCells = gameConfig.solution.filter((pos) => {
      return newBoard[pos.row][pos.col].state !== "queen";
    });

    if (emptyCorrectCells.length > 0) {
      const randomHint =
        emptyCorrectCells[Math.floor(Math.random() * emptyCorrectCells.length)];
      alert(
        `Try placing a queen at row ${randomHint.row + 1}, column ${
          randomHint.col + 1
        }`
      );
    } else {
      alert("All queen positions are correct!");
    }
  };

  // Check if current board state is a winning one
  const checkWinCondition = (currentBoard: Cell[][]): void => {
    // Count queens by color
    const queensByColor: number[] = Array(gameConfig.colors.length + 1).fill(0);
    const queensByRow: number[] = Array(gameConfig.size).fill(0);
    const queensByCol: number[] = Array(gameConfig.size).fill(0);
    const queensPositions: Position[] = [];

    for (let row = 0; row < gameConfig.size; row++) {
      for (let col = 0; col < gameConfig.size; col++) {
        if (currentBoard[row][col].state === "queen") {
          const colorIdx = currentBoard[row][col].color;
          queensByColor[colorIdx]++;
          queensByRow[row]++;
          queensByCol[col]++;
          queensPositions.push({ row, col });
        }
      }
    }

    // Check: one queen per color
    const correctColorCount = queensByColor
      .slice(1)
      .every((count) => count === 1);

    // Check: one queen per row
    const correctRowCount = queensByRow.every((count) => count <= 1);

    // Check: one queen per column
    const correctColCount = queensByCol.every((count) => count <= 1);

    // Check diagonal adjacency
    let noDiagonalAdjacency = true;
    for (let i = 0; i < queensPositions.length; i++) {
      for (let j = i + 1; j < queensPositions.length; j++) {
        const q1 = queensPositions[i];
        const q2 = queensPositions[j];
        if (Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col)) {
          noDiagonalAdjacency = false;
          break;
        }
      }
      if (!noDiagonalAdjacency) break;
    }

    // Check for any cells with errors
    const noErrors = queensPositions.every(
      (pos) => !currentBoard[pos.row][pos.col].hasError
    );

    // Win condition: all checks pass and have the right number of queens
    if (
      correctColorCount &&
      correctRowCount &&
      correctColCount &&
      noDiagonalAdjacency &&
      queensPositions.length === gameConfig.colors.length &&
      noErrors
    ) {
      setHasWon(true);
      setTimerActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onToggleDevTools={toggleDevTools} showDevTools={showDevTools} />

      {/* Game container */}
      <div className="max-w-md mx-auto px-4 pt-6">
        <Timer timer={timer} onClear={handleClear} />

        {/* Confetti container positioned in the center of the screen */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <Confetti active={hasWon} config={confettiConfig} />
        </div>

        {/* Developer Tools Panel */}
        {showDevTools && (
          <DeveloperTools
            board={board}
            solution={gameConfig.solution}
            onShowSolution={handleShowSolution}
          />
        )}

        <GameBoard
          board={board}
          size={gameConfig.size}
          colors={gameConfig.colors}
          onCellClick={handleCellClick}
        />

        <ActionButtons onUndo={handleUndo} onHint={handleHint} />

        <HowToPlay
          showHowToPlay={showHowToPlay}
          onToggle={() => setShowHowToPlay(!showHowToPlay)}
        />

        <Examples
          showExamples={showExamples}
          onToggle={() => setShowExamples(!showExamples)}
        />

        {/* See results button */}
        <button
          className="w-full py-4 bg-black text-white rounded-full mt-6 mb-6 font-bold"
          onClick={() =>
            hasWon
              ? alert("You won! Time: " + formatTime(timer))
              : alert("Keep trying!")
          }
        >
          See results
        </button>
      </div>
    </div>
  );
}
