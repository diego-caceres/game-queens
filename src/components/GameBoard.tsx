import { Cell } from "./types";
import { useState, useCallback, useRef, useEffect } from "react";

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
  const [isProcessingClick, setIsProcessingClick] = useState(false);

  // Add a ref to the board container
  const boardRef = useRef<HTMLDivElement>(null);

  // Set up non-passive touch event handlers
  useEffect(() => {
    const boardElement = boardRef.current;
    if (!boardElement) return;

    // Options for event listeners (makes them non-passive)
    const options = { passive: false };

    // Function to handle touch move events
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      if (!isDragging) return;

      const touch = e.touches[0];
      const element = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLElement;

      const cellCoords = element?.getAttribute("data-coords");
      if (cellCoords) {
        const [row, col] = cellCoords.split("-").map(Number);

        if (
          lastDraggedCell &&
          (lastDraggedCell.row !== row || lastDraggedCell.col !== col) &&
          board[row][col].state === "empty"
        ) {
          onCellClick(row, col);
          setLastDraggedCell({ row, col });
        }
      }
    };

    // Add event listeners
    boardElement.addEventListener("touchmove", handleTouchMove, options);

    // Cleanup
    return () => {
      boardElement.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging, lastDraggedCell, board, onCellClick]);

  // Dedicated function to handle all cell interactions
  const handleCellInteraction = useCallback(
    (row: number, col: number, interactionType: "click" | "drag") => {
      // For clicks, make sure we're not already processing a click or drag
      if (interactionType === "click" && (isDragging || isProcessingClick)) {
        return;
      }

      // For drags, only process empty cells after the initial cell
      if (
        interactionType === "drag" &&
        lastDraggedCell &&
        (lastDraggedCell.row !== row || lastDraggedCell.col !== col) &&
        board[row][col].state !== "empty"
      ) {
        return;
      }

      // Process the cell interaction
      if (interactionType === "click") {
        setIsProcessingClick(true);
        onCellClick(row, col);
        // Reset the flag after a small delay to catch any duplicate events
        setTimeout(() => setIsProcessingClick(false), 50);
      } else if (interactionType === "drag") {
        onCellClick(row, col);
        setLastDraggedCell({ row, col });
      }
    },
    [isDragging, isProcessingClick, lastDraggedCell, board, onCellClick]
  );

  const handleMouseDown = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      // Only handle left mouse button
      if (e.buttons !== 1) return;

      // Prevent default to avoid text selection
      e.preventDefault();

      // Only start dragging on empty cells
      if (board[row][col].state === "empty") {
        setIsDragging(true);
        handleCellInteraction(row, col, "drag");
      } else {
        // For non-empty cells, just handle it as a regular click
        handleCellInteraction(row, col, "click");
      }
    },
    [board, handleCellInteraction]
  );

  const handleTouchStart = useCallback(
    (row: number, col: number, e: React.TouchEvent) => {
      // Prevent default behavior
      e.stopPropagation();

      // Process the touch as a click
      handleCellInteraction(row, col, "click");
    },
    [handleCellInteraction]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (isDragging) {
        handleCellInteraction(row, col, "drag");
      }
    },
    [isDragging, handleCellInteraction]
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
            ref={boardRef}
            className="flex-1 border-4 border-gray-800 rounded-lg overflow-hidden"
            onMouseLeave={handleDragEnd}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className="grid"
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
                    onMouseDown={(e) => handleMouseDown(rowIndex, colIndex, e)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onTouchStart={(e) =>
                      handleTouchStart(rowIndex, colIndex, e)
                    }
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
