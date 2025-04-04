interface TimerProps {
  timer: number;
  onClear: () => void;
}

export const Timer = ({ timer, onClear }: TimerProps) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <div className="flex-1 text-center">
        <span className="text-xl">⏱️ {formatTime(timer)}</span>
      </div>
      <div className="flex-1 text-center">
        <button
          onClick={onClear}
          className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
