"use client";
import { useCallback } from "react";
import { CellStatus, CellPosition, ColorRegion } from "../types";

interface CellProps {
  status: CellStatus;
  position: CellPosition;
  region: ColorRegion;
  isError: boolean;
  onClick: (row: number, col: number) => void;
}

export const Cell: React.FC<CellProps> = ({
  status,
  position,
  region,
  isError,
  onClick,
}) => {
  const { row, col } = position;

  const handleClick = useCallback(() => {
    onClick(row, col);
  }, [onClick, row, col]);

  return (
    <div
      className={`
        w-10 h-10 border border-gray-800 flex items-center justify-center relative
        transition-all duration-200 ${region.color}
        ${
          isError
            ? 'after:absolute after:content-[""] after:w-full after:h-0.5 after:bg-red-500 after:transform after:rotate-45 after:top-1/2 after:-translate-y-1/2 before:absolute before:content-[""] before:w-full before:h-0.5 before:bg-red-500 before:transform before:-rotate-45 before:top-1/2 before:-translate-y-1/2'
            : ""
        }
      `}
      onClick={handleClick}
    >
      {status === "x" && (
        <span className="text-black text-xl font-bold">×</span>
      )}
      {status === "queen" && (
        <span className="text-black text-xl">
          <img src="/crown.svg" alt="Queen" className="w-6 h-6" />
        </span>
      )}
    </div>
  );
};
