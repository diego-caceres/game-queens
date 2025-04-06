interface HowToPlayProps {
  showHowToPlay: boolean;
  onToggle: () => void;
}

export const HowToPlay = ({ showHowToPlay, onToggle }: HowToPlayProps) => {
  return (
    <div className="mt-6 border border-gray-200 rounded-lg">
      <button
        className="w-full p-4 flex justify-between items-center"
        onClick={onToggle}
      >
        <span className="font-bold">How to play</span>
        <span>{showHowToPlay ? "▲" : "▼"}</span>
      </button>
      {showHowToPlay && (
        <div className="p-4 border-t border-gray-200">
          <ul className="space-y-2">
            <li>
              • Place queens on the board so that each colored area has exactly
              one queen
            </li>
            <li>• Only one queen per row</li>
            <li>• Only one queen per column</li>
            <li>
              • Queens cannot be placed in adjacent cells (including diagonally
              adjacent)
            </li>
            <li>
              • Queens can be on the same diagonal if they are not adjacent
            </li>
            <li>• Each colored area consists of adjacent cells only</li>
            <li>• Tap once to mark a space with an X</li>
            <li>• Tap again to place a queen</li>
            <li>• Tap a third time to clear the space</li>
            <li>
              • Red crossed lines will appear on queens that violate the rules
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
