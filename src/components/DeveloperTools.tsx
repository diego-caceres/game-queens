import { Cell, Position } from "./types";

interface DeveloperToolsProps {
  board: Cell[][];
  solution: Position[];
  onShowSolution: () => void;
}

export const DeveloperTools = ({
  board,
  solution,
  onShowSolution,
}: DeveloperToolsProps) => {
  return (
    <div className="mb-4 p-3 bg-gray-800 text-white rounded-lg">
      <div className="text-center font-bold mb-2">Developer Tools</div>
      <div className="flex justify-center space-x-3">
        <button
          onClick={onShowSolution}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Show Solution
        </button>
        <button
          onClick={() => console.log(board)}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
        >
          Log Board State
        </button>
      </div>
      <div className="mt-2 text-xs">
        <pre className="whitespace-pre-wrap">
          Solution: {JSON.stringify(solution, null, 2)}
        </pre>
      </div>
    </div>
  );
};
