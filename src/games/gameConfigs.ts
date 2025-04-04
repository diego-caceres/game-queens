import { GameConfig } from "../components/types";

export const gameConfigs: GameConfig[] = [
  // Screenshot 1 (8x8 board with green, blue, orange regions)
  {
    id: "mixed-regions-8x8-1",
    name: "Mixed Regions 8x8",
    description: "A diverse 8x8 board with multiple colored regions",
    size: 8,
    colors: [
      "#60a5fa", // Blue
      "#f87171", // Red
      "#4ade80", // Green
      "#c084fc", // Purple
      "#fde047", // Yellow
      "#f472b6", // Pink
      "#fb923c", // Orange
      "#9ca3af", // Gray
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 2, 2, 2],
      [1, 1, 1, 1, 1, 2, 2, 2],
      [7, 3, 3, 3, 3, 3, 2, 2],
      [7, 7, 3, 3, 3, 3, 2, 2],
      [7, 3, 3, 3, 3, 4, 3, 3],
      [7, 3, 3, 3, 3, 3, 3, 3],
      [6, 3, 3, 3, 3, 3, 3, 3],
      [6, 7, 7, 3, 3, 8, 8, 8],
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 7 },
      { row: 2, col: 5 },
      { row: 3, col: 1 },
      { row: 4, col: 6 },
      { row: 5, col: 2 },
      { row: 6, col: 0 },
      { row: 7, col: 4 },
    ],
  },
];
