interface ActionButtonsProps {
  onUndo: () => void;
  onHint: () => void;
}

export const ActionButtons = ({ onUndo, onHint }: ActionButtonsProps) => {
  return (
    <div className="flex justify-between gap-4 mt-6">
      <button
        onClick={onUndo}
        className="flex-1 py-3 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        Undo
      </button>
      <button
        onClick={onHint}
        className="flex-1 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
      >
        Hint
      </button>
    </div>
  );
};
