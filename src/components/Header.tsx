import { useRouter } from 'next/navigation';

interface HeaderProps {
  onToggleDevTools: () => void;
  showDevTools: boolean;
}

export const Header = ({ onToggleDevTools, showDevTools }: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <button 
        className="text-2xl hover:text-gray-600 transition-colors" 
        onClick={() => router.push('/')}
        title="Back to Games List"
      >
        &larr;
      </button>
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
