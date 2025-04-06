"use client";

import Link from "next/link";
import { gameConfigs } from "../games/gameConfigs";
import { isDevelopment } from "../utils/environment";

export default function Home() {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getGameStats = (gameId: string) => {
    const statsStr = localStorage.getItem(`game-stats-${gameId}`);
    return statsStr ? JSON.parse(statsStr) : null;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">Queens Game</h1>
            {isDevelopment && (
              <Link
                href="/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create New Board
              </Link>
            )}
          </div>
          <p className="text-xl text-gray-600 mb-12">
            Select a board to start playing
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gameConfigs.map((game) => {
            const stats = getGameStats(game.id);
            return (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {game.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {game.size}x{game.size} Board
                      </span>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                        Play
                      </button>
                    </div>
                    {stats && (
                      <div className="text-sm text-gray-500 border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>Best Time:</span>
                          <span className="font-medium">{formatTime(stats.bestTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Times Completed:</span>
                          <span className="font-medium">{stats.timesCompleted}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
