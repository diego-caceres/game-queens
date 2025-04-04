interface HeaderProps {
  onToggleDevTools: () => void;
  showDevTools: boolean;
}

export const Header = ({ onToggleDevTools, showDevTools }: HeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <button className="text-2xl">&larr;</button>
      <div className="font-bold text-xl">Queens</div>
      <div className="flex items-center space-x-4">
        <button
          className="text-2xl"
          onClick={onToggleDevTools}
          title="Toggle Developer Tools"
        >
          {showDevTools ? "💻" : "?"}
        </button>
        <button className="text-2xl">⚙️</button>
      </div>
    </div>
  );
};
