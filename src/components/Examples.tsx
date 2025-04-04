interface ExamplesProps {
  showExamples: boolean;
  onToggle: () => void;
}

export const Examples = ({ showExamples, onToggle }: ExamplesProps) => {
  return (
    <div className="mt-4 border border-gray-200 rounded-lg">
      <button
        className="w-full p-4 flex justify-between items-center"
        onClick={onToggle}
      >
        <span className="font-bold">Examples</span>
        <span>{showExamples ? "▲" : "▼"}</span>
      </button>
      {showExamples && (
        <div className="p-4 border-t border-gray-200">
          <p>Examples would be shown here...</p>
        </div>
      )}
    </div>
  );
};
