"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { GameConfig } from "./types";
import { saveNewConfig } from "../games/gameConfigs";
import Image from "next/image";

type CellState = {
  colorIndex: number | null;
  hasQueen: boolean;
};

export function BoardCreator() {
  const router = useRouter();
  const [size, setSize] = useState<number | "">("");
  const [step, setStep] = useState<"size" | "creation">("size");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [board, setBoard] = useState<CellState[][]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [name, setName] = useState("");

  const initializeBoard = useCallback((size: number) => {
    const defaultColors = [
      "#60a5fa", // Blue
      "#f87171", // Red
      "#4ade80", // Green
      "#c084fc", // Purple
      "#fde047", // Yellow
      "#9ca3af", // Gray
      "#f472b6", // Pink
      "#fb923c", // Orange
      "#94a3b8", // Slate
      "#a78bfa", // Violet
      "#2dd4bf", // Teal
    ];

    // Take only the needed number of colors
    setColors(defaultColors.slice(0, size));

    // Initialize empty board
    const newBoard: CellState[][] = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => ({
            colorIndex: null,
            hasQueen: false,
          }))
      );
    setBoard(newBoard);
    setStep("creation");
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setBoard((prev) => {
      const newBoard = [...prev.map((row) => [...row])];
      const cell = newBoard[row][col];

      if (cell.hasQueen) {
        // Reset cell on third click
        newBoard[row][col] = { colorIndex: null, hasQueen: false };
      } else if (cell.colorIndex === selectedColor) {
        // Place queen on second click
        newBoard[row][col] = { ...cell, hasQueen: true };
      } else {
        // Color cell on first click
        newBoard[row][col] = { colorIndex: selectedColor, hasQueen: false };
      }

      return newBoard;
    });
  };

  const isValidBoard = () => {
    if (!board.length) return false;

    // Check if all cells have a color
    const allColored = board.every((row) =>
      row.every((cell) => cell.colorIndex !== null)
    );

    // Count queens
    const queenCount = board.reduce(
      (count, row) => count + row.filter((cell) => cell.hasQueen).length,
      0
    );

    return allColored && queenCount === size;
  };

  const handleSave = () => {
    if (!name || !isValidBoard()) return;

    const newConfig: GameConfig = {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      description: `A ${size}x${size} custom board`,
      size: typeof size === "number" ? size : 0,
      colors,
      initialColorLayout: board.map((row) =>
        row.map((cell) => (cell.colorIndex || 0) + 1)
      ),
      solution: board.reduce((acc, row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell.hasQueen) {
            acc.push({ row: rowIndex, col: colIndex });
          }
        });
        return acc;
      }, [] as { row: number; col: number }[]),
    };

    saveNewConfig(newConfig);
    router.push("/");
  };

  if (step === "size") {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Board Size (NxN):
          </label>
          <input
            type="number"
            min="4"
            max="11"
            value={size}
            onChange={(e) =>
              setSize(e.target.value ? Number(e.target.value) : "")
            }
            className="border rounded px-3 py-2 text-black"
          />
        </div>
        <button
          onClick={() => size && initializeBoard(size)}
          disabled={!size || size < 4 || size > 11}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Create Board
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="space-y-2">
          <h3 className="font-medium">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <button
                key={color}
                className={`w-8 h-8 rounded ${
                  selectedColor === index ? "ring-2 ring-black" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          {/* Column numbers */}
          <div
            className="absolute -top-6 left-8 right-0 flex"
            style={{
              gridTemplateColumns: `repeat(${
                typeof size === "number" ? size : 0
              }, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: typeof size === "number" ? size : 0 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="flex-1 text-center text-sm font-medium text-black"
                >
                  {i + 1}
                </div>
              )
            )}
          </div>

          {/* Row numbers and board grid */}
          <div className="flex">
            {/* Row numbers */}
            <div className="flex flex-col justify-around mr-2 py-[1px]">
              {Array.from({ length: typeof size === "number" ? size : 0 }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="text-sm font-medium h-[32px] flex items-center text-black"
                  >
                    {i + 1}
                  </div>
                )
              )}
            </div>

            {/* Board grid */}
            <div
              className="grid gap-[1px] bg-gray-200 p-[1px]"
              style={{
                gridTemplateColumns: `repeat(${
                  typeof size === "number" ? size : 0
                }, minmax(0, 1fr))`,
                width: "min(80vw, 600px)",
                height: "min(80vw, 600px)",
                aspectRatio: "1/1",
              }}
            >
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className="relative flex items-center justify-center aspect-square"
                    style={{
                      backgroundColor:
                        cell.colorIndex !== null
                          ? colors[cell.colorIndex]
                          : "white",
                      borderTop: getBorderStyle(rowIndex, colIndex, "top"),
                      borderRight: getBorderStyle(rowIndex, colIndex, "right"),
                      borderBottom: getBorderStyle(
                        rowIndex,
                        colIndex,
                        "bottom"
                      ),
                      borderLeft: getBorderStyle(rowIndex, colIndex, "left"),
                    }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell.hasQueen && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/crown.svg"
                          alt="Queen"
                          width={32}
                          height={32}
                          className="w-3/4 h-3/4"
                        />
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Board Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 w-full text-black"
            placeholder="Enter a name for your board"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={!isValidBoard() || !name}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Save Board
        </button>
      </div>
    </div>
  );

  function getBorderStyle(
    row: number,
    col: number,
    side: "top" | "right" | "bottom" | "left"
  ): string {
    const currentCell = board[row]?.[col];
    if (!currentCell || currentCell.colorIndex === null)
      return "1px solid #e5e7eb";

    let neighborCell: CellState | undefined;
    switch (side) {
      case "top":
        neighborCell = board[row - 1]?.[col];
        break;
      case "right":
        neighborCell = board[row]?.[col + 1];
        break;
      case "bottom":
        neighborCell = board[row + 1]?.[col];
        break;
      case "left":
        neighborCell = board[row]?.[col - 1];
        break;
    }

    if (!neighborCell || neighborCell.colorIndex === null)
      return "1px solid #e5e7eb";

    return currentCell.colorIndex !== neighborCell.colorIndex
      ? "2px solid #1f2937"
      : "1px solid #e5e7eb";
  }
}
