"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-dom-confetti";
import { useRouter, useParams } from "next/navigation";
import { log } from "../../../utils/environment";
import { GameBoard } from "../../../components/GameBoard";
import { Header } from "../../../components/Header";
import { Timer } from "../../../components/Timer";
import { DeveloperTools } from "../../../components/DeveloperTools";
import { HowToPlay } from "../../../components/HowToPlay";
import { Examples } from "../../../components/Examples";
import { ActionButtons } from "../../../components/ActionButtons";
import { Cell, Position } from "../../../components/types";
import { gameConfigs } from "../../../games/gameConfigs";

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const gameId = params.id as string;
  const gameConfig = gameConfigs.find((game) => game.id === gameId);

  const winCheckRef = useRef<boolean>(false);

  // Game state
  const [board, setBoard] = useState<Cell[][]>([]);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showDevTools, setShowDevTools] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(false);

  // Enhanced win notification
  const [showWinMessage, setShowWinMessage] = useState<boolean>(false);

  // Initialize board
  useEffect(() => {
    if (!gameConfig) return;

    const newBoard: Cell[][] = Array(gameConfig.size)
      .fill(null)
      .map(() =>
        Array(gameConfig.size)
          .fill(null)
          .map(() => ({ state: "empty", color: 1, hasError: false }))
      );

    // Apply color layout
    for (let row = 0; row < gameConfig.size; row++) {
      for (let col = 0; col < gameConfig.size; col++) {
        newBoard[row][col].color = gameConfig.initialColorLayout[row][col];
      }
    }

    setBoard(newBoard);
    setTimerActive(true);
  }, [gameConfig]);

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

  useEffect(() => {
    // Only trigger once when hasWon changes from false to true
    if (hasWon) {
      // Set a flag to prevent duplicate modals
      setShowWinMessage(true);
      
      // Save completion data
      const completedGame = {
        gameId,
        completionTime: timer,
        completedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        // Get existing stats
        const statsStr = localStorage.getItem(`game-stats-${gameId}`);
        const stats = statsStr ? JSON.parse(statsStr) : {
          bestTime: timer,
          lastCompletedAt: completedGame.completedAt,
          timesCompleted: 0
        };

        // Update stats
        stats.timesCompleted++;
        stats.lastCompletedAt = completedGame.completedAt;
        if (timer < stats.bestTime) {
          stats.bestTime = timer;
        }

        // Save updated stats
        localStorage.setItem(`game-stats-${gameId}`, JSON.stringify(stats));
      }
    }
  }, [hasWon, gameId, timer]);

  if (!gameConfig) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Game Not Found
          </h1>
          <p className="text-xl text-gray-600">
            The requested game could not be found.
          </p>
        </div>
      </div>
    );
  }

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

    let hasConflicts = false; // Track if there are any conflicts

    // Mark conflicts by color (more than one queen in same color area)
    Object.values(queensByColor).forEach((positions) => {
      if (positions.length > 1) {
        hasConflicts = true;
        positions.forEach((pos) => {
          boardCopy[pos.row][pos.col].hasError = true;
        });
      }
    });

    // Mark conflicts by row (more than one queen in same row)
    Object.values(queensByRow).forEach((positions) => {
      if (positions.length > 1) {
        hasConflicts = true;
        positions.forEach((pos) => {
          boardCopy[pos.row][pos.col].hasError = true;
        });
      }
    });

    // Mark conflicts by column (more than one queen in same column)
    Object.values(queensByCol).forEach((positions) => {
      if (positions.length > 1) {
        hasConflicts = true;
        positions.forEach((pos) => {
          boardCopy[pos.row][pos.col].hasError = true;
        });
      }
    });

    // Mark adjacent conflicts (queens that are next to each other in any direction)
    for (let i = 0; i < queensPositions.length; i++) {
      for (let j = i + 1; j < queensPositions.length; j++) {
        const q1 = queensPositions[i];
        const q2 = queensPositions[j];

        // Check if queens are adjacent (horizontally, vertically, or diagonally)
        const rowDiff = Math.abs(q1.row - q2.row);
        const colDiff = Math.abs(q1.col - q2.col);

        // Queens are adjacent if they're within 1 cell in any direction
        if (rowDiff <= 1 && colDiff <= 1) {
          hasConflicts = true;
          boardCopy[q1.row][q1.col].hasError = true;
          boardCopy[q2.row][q2.col].hasError = true;
        }
      }
    }

    // Log conflicts for debugging
    if (hasConflicts) {
      log("Conflicts detected:", {
        queensPositions,
        queensByColor,
        queensByRow,
        queensByCol,
      });
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
    winCheckRef.current = false; // Reset the win check flag
    setShowWinMessage(false); // Hide the win message if visible
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

    // Check for adjacency conflicts (queens next to each other in any direction)
    let noAdjacentQueens = true;
    for (let i = 0; i < queensPositions.length; i++) {
      for (let j = i + 1; j < queensPositions.length; j++) {
        const q1 = queensPositions[i];
        const q2 = queensPositions[j];

        // Check if queens are adjacent (horizontally, vertically, or diagonally)
        const rowDiff = Math.abs(q1.row - q2.row);
        const colDiff = Math.abs(q1.col - q2.col);

        if (rowDiff <= 1 && colDiff <= 1) {
          noAdjacentQueens = false;
          break;
        }
      }
      if (!noAdjacentQueens) break;
    }

    // Check for any cells with errors
    const noErrors = queensPositions.every(
      (pos) => !currentBoard[pos.row][pos.col].hasError
    );

    // Debugging log
    log("Win condition checks:", {
      correctColorCount,
      correctRowCount,
      correctColCount,
      noAdjacentQueens,
      expectedQueens: gameConfig.colors.length,
      actualQueens: queensPositions.length,
      noErrors,
    });

    // Win condition: all checks pass and have the right number of queens
    if (
      correctColorCount &&
      correctRowCount &&
      correctColCount &&
      noAdjacentQueens &&
      queensPositions.length === gameConfig.colors.length &&
      !winCheckRef.current && // Only trigger if not already won
      noErrors
    ) {
      setHasWon(true);
      setTimerActive(false);
      setShowWinMessage(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onToggleDevTools={toggleDevTools} showDevTools={showDevTools} />

      {/* Game container */}
      <div className="max-w-md mx-auto px-4 pt-6">
        <Timer timer={timer} onClear={handleClear} />

        {/* Win message */}
        {showWinMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md animate-fade-in">
              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
              <p className="mb-4">
                You solved the puzzle in {formatTime(timer)}!
              </p>
              <button
                onClick={() => {
                  setShowWinMessage(false);
                  router.push("/");
                }}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

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
          hasWon={hasWon}
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
          onClick={() => {
            // Manually check the board again in case we missed something
            if (!hasWon) {
              checkWinCondition(board);
            }

            if (hasWon) {
              setShowWinMessage(true);
            } else {
              alert("Keep trying! You haven't solved the puzzle yet.");
            }
          }}
        >
          See results
        </button>
      </div>
    </div>
  );
}
