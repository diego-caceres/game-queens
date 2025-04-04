import { Cell } from "./types";
import { useState, useCallback } from "react";

interface GameBoardProps {
  board: Cell[][];
  size: number;
  colors: string[];
  onCellClick: (row: number, col: number) => void;
}

export const GameBoard = ({
  board,
  size,
  colors,
  onCellClick,
}: GameBoardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [lastDraggedCell, setLastDraggedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handleDragStart = useCallback(
    (row: number, col: number, e: React.MouseEvent | React.TouchEvent) => {
      // Handle drag start only on left mouse button or touch
      if (
        (e.type === "mousedown" && (e as React.MouseEvent).buttons === 1) ||
        e.type === "touchstart"
      ) {
        // Only start dragging on empty cells
        if (board[row][col].state === null) {
          setIsDragging(true);
          onCellClick(row, col);
          setLastDraggedCell({ row, col });
        }
      }
    },
    [board, onCellClick]
  );

  const handleDrag = useCallback(
    (row: number, col: number) => {
      if (
        isDragging &&
        lastDraggedCell &&
        (lastDraggedCell.row !== row || lastDraggedCell.col !== col) &&
        board[row][col].state === null
      ) {
        onCellClick(row, col);
        setLastDraggedCell({ row, col });
      }
    },
    [isDragging, lastDraggedCell, board, onCellClick]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setLastDraggedCell(null);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-md">
        {/* Column numbers at the top */}
        <div className="flex pl-8 mb-1">
          {Array(size)
            .fill(null)
            .map((_, index) => (
              <div
                key={`col-${index}`}
                className="flex-1 text-center text-sm font-medium"
              >
                {index + 1}
              </div>
            ))}
        </div>

        <div className="flex">
          {/* Row numbers on the left */}
          <div className="flex flex-col justify-between mr-2 pt-1 pb-1">
            {Array(size)
              .fill(null)
              .map((_, index) => (
                <div
                  key={`row-${index}`}
                  className="h-full flex items-center justify-center text-sm font-medium"
                >
                  {index + 1}
                </div>
              ))}
          </div>

          {/* Game board */}
          <div
            className="flex-1 border-4 border-gray-800 rounded-lg overflow-hidden"
            onMouseLeave={handleDragEnd}
            onTouchEnd={handleDragEnd}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className="grid touch-none"
              style={{
                aspectRatio: "1/1",
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
              }}
            >
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      flex items-center justify-center
                      cursor-pointer
                      relative
                      select-none
                    `}
                    style={{
                      aspectRatio: "1/1",
                      height: "100%",
                      width: "100%",
                      backgroundColor: colors[cell.color - 1],
                      borderTop:
                        rowIndex > 0 &&
                        board[rowIndex - 1][colIndex].color !== cell.color
                          ? "2px solid #000"
                          : "1px solid #374151",
                      borderRight:
                        colIndex < size - 1 &&
                        board[rowIndex][colIndex + 1].color !== cell.color
                          ? "2px solid #000"
                          : "1px solid #374151",
                      borderBottom:
                        rowIndex < size - 1 &&
                        board[rowIndex + 1][colIndex].color !== cell.color
                          ? "2px solid #000"
                          : "1px solid #374151",
                      borderLeft:
                        colIndex > 0 &&
                        board[rowIndex][colIndex - 1].color !== cell.color
                          ? "2px solid #000"
                          : "1px solid #374151",
                    }}
                    onMouseDown={(e) => handleDragStart(rowIndex, colIndex, e)}
                    onClick={() => {
                      if (!isDragging) {
                        onCellClick(rowIndex, colIndex);
                      }
                    }}
                    onMouseEnter={() => handleDrag(rowIndex, colIndex)}
                    onMouseUp={handleDragEnd}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      handleDragStart(rowIndex, colIndex, e);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      const touch = e.touches[0];
                      const element = document.elementFromPoint(
                        touch.clientX,
                        touch.clientY
                      );
                      const cellCoords = element?.getAttribute("data-coords");
                      if (cellCoords) {
                        const [row, col] = cellCoords.split("-").map(Number);
                        handleDrag(row, col);
                      }
                    }}
                    data-coords={`${rowIndex}-${colIndex}`}
                  >
                    {/* Cell content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {cell.state === "marked" && (
                        <span className="text-gray-700 text-xl">×</span>
                      )}
                      {cell.state === "queen" && (
                        <div
                          className={`text-amber-500 ${
                            cell.hasError ? "relative" : ""
                          }`}
                        >
                          <img
                            src="/crown.svg"
                            alt="Queen"
                            className="w-6 h-6"
                          />

                          {/* Error indicator */}
                          {cell.hasError && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="absolute w-full h-0.5 bg-red-500 rotate-45 transform origin-center"></div>
                              <div className="absolute w-full h-0.5 bg-red-500 -rotate-45 transform origin-center"></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
