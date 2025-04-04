import { GameConfig } from "../components/types";

export const gameConfigs: GameConfig[] = [
  {
    id: "classic-8x8",
    name: "Classic 8x8",
    description: "The original 8x8 board challenge",
    size: 8,
    colors: [
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-green-200", // Light green
      "bg-rose-300", // Light red/salmon
      "bg-purple-200", // Light purple
      "bg-yellow-200", // Light yellow
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 2, 2, 2],
      [1, 1, 3, 3, 3, 3, 2, 2],
      [7, 3, 3, 3, 3, 3, 3, 2],
      [7, 7, 4, 4, 4, 5, 5, 2],
      [7, 7, 4, 4, 4, 5, 5, 5],
      [7, 7, 4, 6, 6, 5, 5, 5],
      [7, 6, 6, 6, 6, 8, 8, 5],
      [7, 6, 6, 6, 8, 8, 8, 8],
    ],
    solution: [
      { row: 0, col: 3 }, // color 1
      { row: 1, col: 7 }, // color 2
      { row: 2, col: 4 }, // color 3
      { row: 3, col: 2 }, // color 4
      { row: 4, col: 6 }, // color 5
      { row: 5, col: 3 }, // color 6
      { row: 6, col: 0 }, // color 7
      { row: 7, col: 5 }, // color 8
    ],
  },
  // Add more game configurations here
];
