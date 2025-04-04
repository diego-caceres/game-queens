import { Cell } from "./types";

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
          <div className="flex-1 border-4 border-gray-800 rounded-lg overflow-hidden">
            <div
              className={`grid`}
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
                    onClick={() => onCellClick(rowIndex, colIndex)}
                  >
                    {/* Cell content with absolute positioning to prevent affecting layout */}
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
