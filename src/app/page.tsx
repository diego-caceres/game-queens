import type { NextPage } from "next";
import Head from "next/head";
import { Game } from "../components/Game";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Queens Game</title>
        <meta name="description" content="A logic puzzle game with queens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center">
        <Game size={8} />
      </main>
    </div>
  );
};

export default Home;

// "use client";

// import { useState, useEffect } from "react";
// import Head from "next/head";
// import Confetti from "react-dom-confetti";

// // Type definitions
// type CellState = "empty" | "marked" | "queen";

// interface Cell {
//   state: CellState;
//   color: number;
//   hasError?: boolean;
// }

// interface Position {
//   row: number;
//   col: number;
// }

// export default function Home() {
//   // Game configuration
//   const size: number = 8; // 8x8 board
//   const colors: string[] = [
//     "bg-amber-200", // Light orange
//     "bg-blue-200", // Light blue
//     "bg-green-200", // Light green
//     "bg-rose-300", // Light red/salmon
//     "bg-purple-200", // Light purple
//     "bg-yellow-200", // Light yellow
//     "bg-gray-300", // Light gray
//     "bg-stone-400", // Dark gray/brown
//   ];

//   // Example board layout with color areas (1-8 representing different colors)
//   // Each color area has adjacent cells only and all colors are used
//   const initialColorLayout: number[][] = [
//     [1, 1, 1, 1, 1, 2, 2, 2],
//     [1, 1, 3, 3, 3, 3, 2, 2],
//     [7, 3, 3, 3, 3, 3, 3, 2],
//     [7, 7, 4, 4, 4, 5, 5, 2],
//     [7, 7, 4, 4, 4, 5, 5, 5],
//     [7, 7, 4, 6, 6, 5, 5, 5],
//     [7, 6, 6, 6, 6, 8, 8, 5],
//     [7, 6, 6, 6, 8, 8, 8, 8],
//   ];

//   // Solution example - positions of queens for each color area
//   const solution: Position[] = [
//     { row: 0, col: 3 }, // color 1
//     { row: 1, col: 7 }, // color 2
//     { row: 2, col: 4 }, // color 3
//     { row: 3, col: 2 }, // color 4
//     { row: 4, col: 6 }, // color 5
//     { row: 5, col: 3 }, // color 6
//     { row: 6, col: 0 }, // color 7
//     { row: 7, col: 5 }, // color 8
//   ];

//   // Confetti configuration
//   const confettiConfig = {
//     angle: 90,
//     spread: 360,
//     startVelocity: 40,
//     elementCount: 100,
//     dragFriction: 0.12,
//     duration: 3000,
//     stagger: 3,
//     width: "10px",
//     height: "10px",
//     colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
//   };

//   // Game state
//   const [board, setBoard] = useState<Cell[][]>([]);
//   const [hasWon, setHasWon] = useState<boolean>(false);
//   const [timer, setTimer] = useState<number>(0);
//   const [timerActive, setTimerActive] = useState<boolean>(false);
//   const [showDevTools, setShowDevTools] = useState<boolean>(false);

//   // Initialize board
//   useEffect(() => {
//     const newBoard: Cell[][] = Array(size)
//       .fill(null)
//       .map(() =>
//         Array(size)
//           .fill(null)
//           .map(() => ({ state: "empty", color: 0, hasError: false }))
//       );

//     // Apply color layout
//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         newBoard[row][col].color = initialColorLayout[row][col];
//       }
//     }

//     setBoard(newBoard);
//     setTimerActive(true);
//   }, []);

//   // Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (timerActive && !hasWon) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev + 1);
//       }, 1000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [timerActive, hasWon]);

//   // Format timer as MM:SS
//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   // Check for conflicts and mark cells with errors
//   const checkForConflicts = (currentBoard: Cell[][]): Cell[][] => {
//     // Create a deep copy of the board to avoid reference issues
//     const boardCopy: Cell[][] = JSON.parse(JSON.stringify(currentBoard));

//     // Reset all error states first
//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         boardCopy[row][col].hasError = false;
//       }
//     }

//     // Find all queens
//     const queensPositions: Position[] = [];
//     const queensByColor: { [key: number]: Position[] } = {};
//     const queensByRow: { [key: number]: Position[] } = {};
//     const queensByCol: { [key: number]: Position[] } = {};

//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         if (boardCopy[row][col].state === "queen") {
//           const position = { row, col };
//           queensPositions.push(position);

//           // Group by color
//           const colorIdx = boardCopy[row][col].color;
//           if (!queensByColor[colorIdx]) queensByColor[colorIdx] = [];
//           queensByColor[colorIdx].push(position);

//           // Group by row
//           if (!queensByRow[row]) queensByRow[row] = [];
//           queensByRow[row].push(position);

//           // Group by column
//           if (!queensByCol[col]) queensByCol[col] = [];
//           queensByCol[col].push(position);
//         }
//       }
//     }

//     // Mark conflicts by color (more than one queen in same color area)
//     Object.values(queensByColor).forEach((positions) => {
//       if (positions.length > 1) {
//         positions.forEach((pos) => {
//           boardCopy[pos.row][pos.col].hasError = true;
//         });
//       }
//     });

//     // Mark conflicts by row (more than one queen in same row)
//     Object.values(queensByRow).forEach((positions) => {
//       if (positions.length > 1) {
//         positions.forEach((pos) => {
//           boardCopy[pos.row][pos.col].hasError = true;
//         });
//       }
//     });

//     // Mark conflicts by column (more than one queen in same column)
//     Object.values(queensByCol).forEach((positions) => {
//       if (positions.length > 1) {
//         positions.forEach((pos) => {
//           boardCopy[pos.row][pos.col].hasError = true;
//         });
//       }
//     });

//     // Mark diagonal conflicts
//     for (let i = 0; i < queensPositions.length; i++) {
//       for (let j = i + 1; j < queensPositions.length; j++) {
//         const q1 = queensPositions[i];
//         const q2 = queensPositions[j];

//         // Check if queens are diagonally adjacent
//         if (Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col)) {
//           boardCopy[q1.row][q1.col].hasError = true;
//           boardCopy[q2.row][q2.col].hasError = true;
//         }
//       }
//     }

//     return boardCopy;
//   };

//   // Handle cell click
//   const handleCellClick = (row: number, col: number): void => {
//     if (hasWon) return;

//     const newBoard = [...board];
//     const cell = newBoard[row][col];

//     // Cycle through states: empty -> marked -> queen -> empty
//     switch (cell.state) {
//       case "empty":
//         cell.state = "marked";
//         break;
//       case "marked":
//         cell.state = "queen";
//         break;
//       case "queen":
//         cell.state = "empty";
//         break;
//     }

//     // Check for conflicts and mark errors
//     const boardWithConflicts = checkForConflicts(newBoard);
//     setBoard(boardWithConflicts);

//     // Check win condition
//     checkWinCondition(boardWithConflicts);
//   };

//   // Reset the board
//   const handleClear = (): void => {
//     const newBoard = [...board];
//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         newBoard[row][col].state = "empty";
//         newBoard[row][col].hasError = false;
//       }
//     }
//     setBoard(newBoard);
//     setHasWon(false);
//     setTimer(0);
//     setTimerActive(true);
//   };

//   // Show solution (for development)
//   const handleShowSolution = (): void => {
//     const newBoard = [...board];

//     // First clear the board
//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         newBoard[row][col].state = "empty";
//         newBoard[row][col].hasError = false;
//       }
//     }

//     // Place queens according to the solution
//     solution.forEach((pos) => {
//       newBoard[pos.row][pos.col].state = "queen";
//     });

//     setBoard(newBoard);
//     checkWinCondition(newBoard);
//   };

//   // Toggle developer tools
//   const toggleDevTools = (): void => {
//     setShowDevTools(!showDevTools);
//   };

//   // Undo button placeholder (would need move history to implement fully)
//   const handleUndo = (): void => {
//     // This would require tracking move history
//     alert("Undo feature would require move history tracking");
//   };

//   // Hint button placeholder
//   const handleHint = (): void => {
//     // Simple hint implementation
//     const newBoard = [...board];

//     // Find a random empty cell where a queen should be placed
//     const emptyCorrectCells = solution.filter((pos) => {
//       return newBoard[pos.row][pos.col].state !== "queen";
//     });

//     if (emptyCorrectCells.length > 0) {
//       const randomHint =
//         emptyCorrectCells[Math.floor(Math.random() * emptyCorrectCells.length)];
//       alert(
//         `Try placing a queen at row ${randomHint.row + 1}, column ${
//           randomHint.col + 1
//         }`
//       );
//     } else {
//       alert("All queen positions are correct!");
//     }
//   };

//   // Check if current board state is a winning one
//   const checkWinCondition = (currentBoard: Cell[][]): void => {
//     // Count queens by color
//     const queensByColor: number[] = Array(colors.length + 1).fill(0);
//     const queensByRow: number[] = Array(size).fill(0);
//     const queensByCol: number[] = Array(size).fill(0);
//     const queensPositions: Position[] = [];

//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         if (currentBoard[row][col].state === "queen") {
//           const colorIdx = currentBoard[row][col].color;
//           queensByColor[colorIdx]++;
//           queensByRow[row]++;
//           queensByCol[col]++;
//           queensPositions.push({ row, col });
//         }
//       }
//     }

//     // Check: one queen per color
//     const correctColorCount = queensByColor
//       .slice(1)
//       .every((count) => count === 1);

//     // Check: one queen per row
//     const correctRowCount = queensByRow.every((count) => count <= 1);

//     // Check: one queen per column
//     const correctColCount = queensByCol.every((count) => count <= 1);

//     // Check diagonal adjacency
//     let noDiagonalAdjacency = true;
//     for (let i = 0; i < queensPositions.length; i++) {
//       for (let j = i + 1; j < queensPositions.length; j++) {
//         const q1 = queensPositions[i];
//         const q2 = queensPositions[j];
//         if (Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col)) {
//           noDiagonalAdjacency = false;
//           break;
//         }
//       }
//       if (!noDiagonalAdjacency) break;
//     }

//     // Check for any cells with errors
//     const noErrors = queensPositions.every(
//       (pos) => !currentBoard[pos.row][pos.col].hasError
//     );

//     // Win condition: all checks pass and have the right number of queens
//     if (
//       correctColorCount &&
//       correctRowCount &&
//       correctColCount &&
//       noDiagonalAdjacency &&
//       queensPositions.length === colors.length &&
//       noErrors
//     ) {
//       setHasWon(true);
//       setTimerActive(false);
//     }
//   };

//   // Toggle How to Play section
//   const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
//   const [showExamples, setShowExamples] = useState<boolean>(false);

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       {/* Header - Simplified to match screenshot */}
//       <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
//         <button className="text-2xl">&larr;</button>
//         <div className="font-bold text-xl">Queens</div>
//         <div className="flex items-center space-x-4">
//           <button
//             className="text-2xl"
//             onClick={toggleDevTools}
//             title="Toggle Developer Tools"
//           >
//             {showDevTools ? "💻" : "?"}
//           </button>
//           <button className="text-2xl">⚙️</button>
//         </div>
//       </div>

//       {/* Game container */}
//       <div className="max-w-md mx-auto px-4 pt-6">
//         {/* Timer and clear button */}
//         <div className="flex justify-center items-center mb-6">
//           <div className="flex-1 text-center">
//             <span className="text-xl">⏱️ {formatTime(timer)}</span>
//           </div>
//           <div className="flex-1 text-center">
//             <button
//               onClick={handleClear}
//               className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
//             >
//               Clear
//             </button>
//           </div>
//         </div>

//         {/* Confetti container positioned in the center of the screen */}
//         <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
//           <Confetti active={hasWon} config={confettiConfig} />
//         </div>

//         {/* Developer Tools Panel */}
//         {showDevTools && (
//           <div className="mb-4 p-3 bg-gray-800 text-white rounded-lg">
//             <div className="text-center font-bold mb-2">Developer Tools</div>
//             <div className="flex justify-center space-x-3">
//               <button
//                 onClick={handleShowSolution}
//                 className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
//               >
//                 Show Solution
//               </button>
//               <button
//                 onClick={() => console.log(board)}
//                 className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
//               >
//                 Log Board State
//               </button>
//             </div>
//             <div className="mt-2 text-xs">
//               <pre className="whitespace-pre-wrap">
//                 Solution: {JSON.stringify(solution, null, 2)}
//               </pre>
//             </div>
//           </div>
//         )}

//         {/* Game board with row and column numbers */}
//         <div className="flex justify-center">
//           <div className="relative w-full max-w-md">
//             {/* Column numbers at the top */}
//             <div className="flex pl-8 mb-1">
//               {Array(size)
//                 .fill(null)
//                 .map((_, index) => (
//                   <div
//                     key={`col-${index}`}
//                     className="flex-1 text-center text-sm font-medium"
//                   >
//                     {index + 1}
//                   </div>
//                 ))}
//             </div>

//             <div className="flex">
//               {/* Row numbers on the left */}
//               <div className="flex flex-col justify-between mr-2 pt-1 pb-1">
//                 {Array(size)
//                   .fill(null)
//                   .map((_, index) => (
//                     <div
//                       key={`row-${index}`}
//                       className="h-full flex items-center justify-center text-sm font-medium"
//                     >
//                       {index + 1}
//                     </div>
//                   ))}
//               </div>

//               {/* Game board */}
//               <div className="flex-1 border-2 border-gray-700 rounded-lg overflow-hidden">
//                 <div
//                   className="grid grid-cols-8 grid-rows-8"
//                   style={{ aspectRatio: "1/1" }}
//                 >
//                   {board.map((row, rowIndex) =>
//                     row.map((cell, colIndex) => (
//                       <div
//                         key={`${rowIndex}-${colIndex}`}
//                         className={`
//                           ${colors[cell.color - 1]}
//                           border border-gray-700
//                           flex items-center justify-center
//                           cursor-pointer
//                           relative
//                         `}
//                         style={{
//                           aspectRatio: "1/1",
//                           height: "100%",
//                           width: "100%",
//                         }}
//                         onClick={() => handleCellClick(rowIndex, colIndex)}
//                       >
//                         {/* Cell content with absolute positioning to prevent affecting layout */}
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           {cell.state === "marked" && (
//                             <span className="text-gray-700 text-xl">×</span>
//                           )}
//                           {cell.state === "queen" && (
//                             <div
//                               className={`text-amber-500 ${
//                                 cell.hasError ? "relative" : ""
//                               }`}
//                             >
//                               <svg
//                                 viewBox="0 0 24 24"
//                                 width="28"
//                                 height="28"
//                                 fill="currentColor"
//                               >
//                                 <path d="M12 2L15 9H21L16 14L18 21L12 17L6 21L8 14L3 9H9L12 2Z" />
//                               </svg>

//                               {/* Error indicator */}
//                               {cell.hasError && (
//                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                                   <div className="absolute w-full h-0.5 bg-red-500 rotate-45 transform origin-center"></div>
//                                   <div className="absolute w-full h-0.5 bg-red-500 -rotate-45 transform origin-center"></div>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="flex justify-between gap-4 mt-6">
//           <button
//             onClick={handleUndo}
//             className="flex-1 py-3 bg-gray-200 rounded-full hover:bg-gray-300"
//           >
//             Undo
//           </button>
//           <button
//             onClick={handleHint}
//             className="flex-1 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
//           >
//             Hint
//           </button>
//         </div>

//         {/* How to play accordion */}
//         <div className="mt-6 border border-gray-200 rounded-lg">
//           <button
//             className="w-full p-4 flex justify-between items-center"
//             onClick={() => setShowHowToPlay(!showHowToPlay)}
//           >
//             <span className="font-bold">How to play</span>
//             <span>{showHowToPlay ? "▲" : "▼"}</span>
//           </button>
//           {showHowToPlay && (
//             <div className="p-4 border-t border-gray-200">
//               <ul className="space-y-2">
//                 <li>
//                   • Place queens on the board so that each colored area has
//                   exactly one queen
//                 </li>
//                 <li>• Only one queen per row</li>
//                 <li>• Only one queen per column</li>
//                 <li>
//                   • No queens can be placed diagonally adjacent to each other
//                 </li>
//                 <li>• Each colored area consists of adjacent cells only</li>
//                 <li>• Tap once to mark a space with an X</li>
//                 <li>• Tap again to place a queen</li>
//                 <li>• Tap a third time to clear the space</li>
//                 <li>
//                   • Red crossed lines will appear on queens that violate the
//                   rules
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Examples accordion */}
//         <div className="mt-4 border border-gray-200 rounded-lg">
//           <button
//             className="w-full p-4 flex justify-between items-center"
//             onClick={() => setShowExamples(!showExamples)}
//           >
//             <span className="font-bold">Examples</span>
//             <span>{showExamples ? "▲" : "▼"}</span>
//           </button>
//           {showExamples && (
//             <div className="p-4 border-t border-gray-200">
//               <p>Examples would be shown here...</p>
//             </div>
//           )}
//         </div>

//         {/* See results button */}
//         <button
//           className="w-full py-4 bg-black text-white rounded-full mt-6 mb-6 font-bold"
//           onClick={() =>
//             hasWon
//               ? alert("You won! Time: " + formatTime(timer))
//               : alert("Keep trying!")
//           }
//         >
//           See results
//         </button>
//       </div>
//     </div>
//   );
// }
