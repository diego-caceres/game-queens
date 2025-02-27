"use client";
import { useCallback } from "react";
import { BoardState } from "../types";
import { Cell } from "./Cell";
import { getRegionForCell } from "../gameLogic";

interface BoardProps {
  board: BoardState;
  onCellClick: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  const { cells, size, regions, errors } = board;

  const isError = useCallback(
    (row: number, col: number): boolean => {
      return errors.some((err) => err.row === row && err.col === col);
    },
    [errors]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex mb-1">
        <div className="w-6"></div>
        {Array.from({ length: size }, (_, i) => (
          <div
            key={i}
            className="w-10 h-6 flex items-center justify-center font-bold"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          <div className="w-6 h-10 flex items-center justify-center font-bold">
            {rowIndex + 1}
          </div>
          {row.map((cell, colIndex) => {
            const region = getRegionForCell(regions, rowIndex, colIndex);
            return region ? (
              <Cell
                key={colIndex}
                status={cell}
                position={{ row: rowIndex, col: colIndex }}
                region={region}
                isError={isError(rowIndex, colIndex)}
                onClick={onCellClick}
              />
            ) : null;
          })}
        </div>
      ))}
    </div>
  );
};
