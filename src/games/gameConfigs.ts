import { GameConfig } from "../components/types";

export const gameConfigs: GameConfig[] = [
  // {
  //   id: "classic-8x8",
  //   name: "Classic 8x8",
  //   description: "The original 8x8 board challenge",
  //   size: 8,
  //   colors: [
  //     "bg-amber-200", // Light orange
  //     "bg-blue-200", // Light blue
  //     "bg-green-200", // Light green
  //     "bg-rose-300", // Light red/salmon
  //     "bg-purple-200", // Light purple
  //     "bg-yellow-200", // Light yellow
  //     "bg-gray-300", // Light gray
  //     "bg-stone-400", // Dark gray/brown
  //   ],
  //   initialColorLayout: [
  //     [1, 1, 1, 1, 1, 2, 2, 2],
  //     [1, 1, 3, 3, 3, 3, 2, 2],
  //     [7, 3, 3, 3, 3, 3, 3, 2],
  //     [7, 7, 4, 4, 4, 5, 5, 2],
  //     [7, 7, 4, 4, 4, 5, 5, 5],
  //     [7, 7, 4, 6, 6, 5, 5, 5],
  //     [7, 6, 6, 6, 6, 8, 8, 5],
  //     [7, 6, 6, 6, 8, 8, 8, 8],
  //   ],
  //   solution: [
  //     { row: 0, col: 3 }, // color 1
  //     { row: 1, col: 7 }, // color 2
  //     { row: 2, col: 4 }, // color 3
  //     { row: 3, col: 2 }, // color 4
  //     { row: 4, col: 6 }, // color 5
  //     { row: 5, col: 3 }, // color 6
  //     { row: 6, col: 0 }, // color 7
  //     { row: 7, col: 5 }, // color 8
  //   ],
  // },
  // Add more game configurations here
  // Screenshot 1 (8x8 board with green, blue, orange regions)
  {
    id: "mixed-regions-8x8-1",
    name: "Mixed Regions 8x8",
    description: "A diverse 8x8 board with multiple colored regions",
    size: 8,
    colors: [
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-green-200", // Light green
      "bg-red-200", // Light red
      "bg-purple-200", // Light purple
      "bg-yellow-200", // Light yellow
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
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

  // Screenshot 2 (9x9 board with blue, orange, red, green regions)
  {
    id: "hard-challenge-9x9",
    name: "Hard Challenge 9x9",
    description: "A difficult 9x9 board with complex color patterns",
    size: 9,
    colors: [
      "bg-green-200", // Light green
      "bg-amber-200", // Light orange
      "bg-red-200", // Light red
      "bg-blue-200", // Light blue
      "bg-purple-200", // Light purple
      "bg-yellow-200", // Light yellow
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
      "bg-rose-300", // Light rose
    ],
    initialColorLayout: [
      [3, 3, 3, 4, 5, 5, 5, 3, 3],
      [3, 3, 3, 4, 5, 5, 5, 3, 3],
      [3, 3, 3, 4, 5, 5, 5, 3, 3],
      [4, 5, 4, 4, 2, 2, 4, 4, 9],
      [5, 5, 5, 2, 2, 2, 2, 4, 9],
      [5, 5, 5, 2, 2, 2, 2, 9, 9],
      [8, 8, 6, 6, 6, 2, 2, 9, 9],
      [8, 6, 6, 6, 6, 6, 7, 7, 9],
      [8, 6, 6, 6, 6, 6, 7, 7, 9],
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 8 },
      { row: 2, col: 5 },
      { row: 3, col: 0 },
      { row: 4, col: 6 },
      { row: 5, col: 2 },
      { row: 6, col: 7 },
      { row: 7, col: 1 },
      { row: 8, col: 4 },
    ],
  },

  // Screenshot 3 (10x10 board with blue, purple, yellow regions)
  {
    id: "royal-puzzle-10x10",
    name: "Royal Puzzle 10x10",
    description: "A regal 10x10 board with purple and blue tones",
    size: 10,
    colors: [
      "bg-purple-200", // Light purple
      "bg-blue-200", // Light blue
      "bg-green-200", // Light green
      "bg-yellow-200", // Light yellow
      "bg-rose-300", // Light rose
      "bg-red-200", // Light red
      "bg-amber-200", // Light orange
      "bg-gray-300", // Light gray
      "bg-cyan-200", // Light cyan
      "bg-stone-400", // Dark gray/brown
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 8, 9, 9],
      [1, 1, 1, 1, 1, 1, 8, 8, 9, 9],
      [1, 1, 2, 3, 3, 3, 3, 3, 3, 10],
      [1, 1, 3, 3, 3, 3, 3, 3, 3, 10],
      [5, 5, 3, 3, 4, 4, 4, 3, 10, 10],
      [5, 5, 5, 4, 4, 4, 4, 4, 4, 10],
      [5, 5, 5, 4, 6, 6, 4, 4, 4, 10],
      [7, 7, 5, 5, 4, 4, 4, 4, 10, 10],
      [7, 7, 7, 7, 7, 7, 7, 10, 10, 10],
      [7, 7, 7, 7, 7, 7, 7, 7, 10, 10],
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 6 },
      { row: 2, col: 8 },
      { row: 3, col: 4 },
      { row: 4, col: 0 },
      { row: 5, col: 7 },
      { row: 6, col: 5 },
      { row: 7, col: 1 },
      { row: 8, col: 9 },
      { row: 9, col: 3 },
    ],
  },

  // Screenshot 4 (7x7 board with pastel regions)
  {
    id: "pastel-maze-7x7",
    name: "Pastel Maze 7x7",
    description: "A smaller 7x7 board with soft pastel colors",
    size: 7,
    colors: [
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-green-200", // Light green
      "bg-gray-300", // Light gray
      "bg-yellow-200", // Light yellow
      "bg-purple-200", // Light purple
      "bg-red-200", // Light red
    ],
    initialColorLayout: [
      [1, 1, 1, 4, 5, 5, 5],
      [1, 1, 1, 4, 4, 5, 5],
      [1, 2, 4, 4, 5, 5, 6],
      [2, 2, 2, 4, 5, 6, 6],
      [3, 2, 2, 7, 5, 6, 6],
      [3, 3, 3, 7, 7, 7, 6],
      [3, 3, 3, 7, 7, 7, 6],
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 4 },
      { row: 2, col: 0 },
      { row: 3, col: 6 },
      { row: 4, col: 3 },
      { row: 5, col: 1 },
      { row: 6, col: 5 },
    ],
  },

  // Screenshot 5 (9x9 board with purple, yellow, red regions)
  {
    id: "purple-dominion-9x9",
    name: "Purple Dominion 9x9",
    description: "A 9x9 board with dominant purple regions",
    size: 9,
    colors: [
      "bg-purple-200", // Light purple
      "bg-yellow-200", // Light yellow
      "bg-green-200", // Light green
      "bg-red-200", // Light red
      "bg-blue-200", // Light blue
      "bg-amber-200", // Light orange
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
      "bg-rose-300", // Light rose
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 9, 9, 9],
      [1, 1, 1, 1, 5, 5, 9, 9, 9],
      [1, 1, 3, 3, 5, 5, 9, 9, 9],
      [1, 1, 3, 3, 5, 5, 9, 8, 8],
      [1, 3, 3, 3, 5, 5, 9, 8, 8],
      [1, 2, 2, 2, 2, 5, 8, 8, 8],
      [1, 2, 2, 2, 2, 7, 7, 7, 8],
      [1, 1, 1, 4, 4, 7, 7, 7, 7],
      [1, 1, 1, 4, 4, 4, 6, 6, 6],
    ],
    solution: [
      { row: 0, col: 5 },
      { row: 1, col: 1 },
      { row: 2, col: 6 },
      { row: 3, col: 3 },
      { row: 4, col: 8 },
      { row: 5, col: 0 },
      { row: 6, col: 5 },
      { row: 7, col: 7 },
      { row: 8, col: 2 },
    ],
  },

  // Screenshot 6 (8x8 board with purple, red, yellow regions)
  {
    id: "autumn-colors-8x8",
    name: "Autumn Colors 8x8",
    description: "An 8x8 board with autumn-inspired color patterns",
    size: 8,
    colors: [
      "bg-purple-200", // Light purple
      "bg-red-200", // Light red
      "bg-gray-300", // Light gray
      "bg-green-200", // Light green
      "bg-yellow-200", // Light yellow
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-stone-400", // Dark gray/brown
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 7, 7],
      [1, 1, 1, 4, 4, 4, 7, 7],
      [1, 1, 3, 3, 4, 4, 4, 8],
      [1, 2, 2, 3, 3, 3, 4, 4],
      [1, 2, 2, 3, 3, 3, 5, 5],
      [6, 2, 2, 3, 3, 3, 5, 5],
      [6, 2, 2, 3, 3, 5, 5, 5],
      [6, 3, 3, 3, 3, 5, 5, 5],
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 7 },
      { row: 2, col: 0 },
      { row: 3, col: 5 },
      { row: 4, col: 1 },
      { row: 5, col: 6 },
      { row: 6, col: 3 },
      { row: 7, col: 2 },
    ],
  },

  // Screenshot 7 (8x8 board with different color distribution)
  {
    id: "geometric-puzzle-8x8",
    name: "Geometric Puzzle 8x8",
    description: "An 8x8 board with geometric color patterns",
    size: 8,
    colors: [
      "bg-gray-300", // Light gray
      "bg-blue-200", // Light blue
      "bg-green-200", // Light green
      "bg-red-200", // Light red
      "bg-yellow-200", // Light yellow
      "bg-purple-200", // Light purple
      "bg-amber-200", // Light orange
      "bg-stone-400", // Dark gray/brown
    ],
    initialColorLayout: [
      [1, 2, 3, 3, 3, 3, 3, 3],
      [1, 2, 2, 3, 3, 3, 4, 4],
      [1, 1, 2, 2, 5, 5, 4, 4],
      [6, 1, 2, 5, 5, 5, 4, 4],
      [6, 6, 2, 5, 5, 7, 4, 4],
      [6, 6, 2, 2, 7, 7, 7, 4],
      [6, 6, 8, 8, 8, 7, 7, 7],
      [6, 8, 8, 8, 8, 8, 7, 7],
    ],
    solution: [
      { row: 0, col: 1 },
      { row: 1, col: 5 },
      { row: 2, col: 7 },
      { row: 3, col: 2 },
      { row: 4, col: 0 },
      { row: 5, col: 6 },
      { row: 6, col: 3 },
      { row: 7, col: 4 },
    ],
  },

  // Screenshot 8 (11x11 board with cyan and pink regions)
  {
    id: "ocean-view-11x11",
    name: "Ocean View 11x11",
    description: "A large 11x11 board with ocean-inspired colors",
    size: 11,
    colors: [
      "bg-cyan-200", // Light cyan
      "bg-purple-200", // Light purple
      "bg-red-200", // Light red
      "bg-green-200", // Light green
      "bg-rose-300", // Light rose
      "bg-gray-300", // Light gray
      "bg-yellow-200", // Light yellow
      "bg-stone-400", // Dark gray/brown
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-emerald-200", // Light emerald
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 3, 3, 3, 3, 3, 3, 4, 2, 1],
      [1, 2, 3, 3, 3, 3, 3, 4, 4, 2, 1],
      [1, 2, 3, 3, 5, 5, 5, 4, 4, 2, 1],
      [1, 2, 3, 3, 5, 6, 5, 4, 4, 2, 1],
      [1, 2, 3, 3, 5, 5, 5, 4, 4, 2, 1],
      [1, 2, 3, 3, 3, 3, 4, 4, 4, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    solution: [
      { row: 0, col: 0 },
      { row: 1, col: 5 },
      { row: 2, col: 8 },
      { row: 3, col: 1 },
      { row: 4, col: 4 },
      { row: 5, col: 9 },
      { row: 6, col: 6 },
      { row: 7, col: 2 },
      { row: 8, col: 10 },
      { row: 9, col: 3 },
      { row: 10, col: 7 },
    ],
  },

  // Screenshot 9 (10x10 board with blue, pink regions)
  {
    id: "rainbow-quest-10x10",
    name: "Rainbow Quest 10x10",
    description: "A colorful 10x10 board with vibrant regions",
    size: 10,
    colors: [
      "bg-red-200", // Light red
      "bg-blue-200", // Light blue
      "bg-purple-200", // Light purple
      "bg-green-200", // Light green
      "bg-yellow-200", // Light yellow
      "bg-rose-300", // Light rose
      "bg-amber-200", // Light orange
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
      "bg-cyan-200", // Light cyan
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 2, 2, 2, 8, 8, 1],
      [1, 1, 3, 3, 2, 2, 8, 8, 8, 1],
      [1, 1, 3, 3, 3, 2, 2, 8, 9, 9],
      [1, 4, 3, 3, 3, 5, 5, 9, 9, 9],
      [4, 4, 6, 6, 5, 5, 5, 9, 9, 9],
      [4, 6, 6, 6, 5, 5, 7, 7, 9, 9],
      [4, 6, 6, 6, 5, 7, 7, 7, 9, 9],
      [4, 6, 6, 10, 10, 10, 10, 7, 7, 9],
      [4, 4, 10, 10, 10, 10, 10, 10, 7, 9],
    ],
    solution: [
      { row: 0, col: 5 },
      { row: 1, col: 2 },
      { row: 2, col: 8 },
      { row: 3, col: 0 },
      { row: 4, col: 3 },
      { row: 5, col: 7 },
      { row: 6, col: 1 },
      { row: 7, col: 5 },
      { row: 8, col: 9 },
      { row: 9, col: 4 },
    ],
  },

  // Screenshot 10 (8x8 board with blue, orange regions)
  {
    id: "blue-orange-8x8",
    name: "Blue & Orange 8x8",
    description: "An 8x8 board with contrasting blue and orange colors",
    size: 8,
    colors: [
      "bg-blue-200", // Light blue
      "bg-amber-200", // Light orange
      "bg-purple-200", // Light purple
      "bg-gray-300", // Light gray
      "bg-yellow-200", // Light yellow
      "bg-green-200", // Light green
      "bg-stone-400", // Dark gray/brown
      "bg-red-200", // Light red
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 3, 3, 3, 3, 2, 1],
      [1, 2, 3, 4, 4, 3, 2, 1],
      [1, 2, 3, 4, 4, 3, 2, 1],
      [1, 2, 3, 3, 3, 3, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    solution: [
      { row: 0, col: 5 },
      { row: 1, col: 1 },
      { row: 2, col: 6 },
      { row: 3, col: 3 },
      { row: 4, col: 7 },
      { row: 5, col: 2 },
      { row: 6, col: 4 },
      { row: 7, col: 0 },
    ],
  },

  // Screenshot 11 (9x9 board with purple, green, blue regions)
  {
    id: "sunset-vista-9x9",
    name: "Sunset Vista 9x9",
    description: "A 9x9 board with sunset-inspired color scheme",
    size: 9,
    colors: [
      "bg-yellow-200", // Light yellow
      "bg-red-200", // Light red
      "bg-purple-200", // Light purple
      "bg-blue-200", // Light blue
      "bg-gray-300", // Light gray
      "bg-green-200", // Light green
      "bg-amber-200", // Light orange
      "bg-stone-400", // Dark gray/brown
      "bg-rose-300", // Light rose
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 9],
      [1, 2, 2, 1, 1, 1, 1, 1, 9],
      [2, 2, 2, 2, 1, 1, 1, 9, 9],
      [2, 3, 3, 4, 4, 4, 9, 9, 9],
      [3, 3, 3, 4, 4, 4, 9, 9, 9],
      [3, 3, 3, 4, 4, 9, 9, 9, 9],
      [5, 3, 3, 6, 6, 6, 6, 6, 9],
      [5, 5, 7, 7, 7, 6, 6, 6, 9],
      [5, 5, 7, 7, 7, 8, 8, 8, 8],
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 7 },
      { row: 2, col: 1 },
      { row: 3, col: 6 },
      { row: 4, col: 2 },
      { row: 5, col: 5 },
      { row: 6, col: 0 },
      { row: 7, col: 4 },
      { row: 8, col: 8 },
    ],
  },

  // Screenshot 12 (9x9 board with prominent pink regions)
  {
    id: "pink-paradise-9x9",
    name: "Pink Paradise 9x9",
    description: "A 9x9 board with prominent pink and pastel regions",
    size: 9,
    colors: [
      "bg-rose-300", // Light rose
      "bg-gray-300", // Light gray
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-purple-200", // Light purple
      "bg-green-200", // Light green
      "bg-yellow-200", // Light yellow
      "bg-red-200", // Light red
      "bg-stone-400", // Dark gray/brown
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 2, 2, 2, 1, 1],
      [1, 1, 2, 3, 3, 3, 2, 1, 1],
      [1, 1, 2, 3, 4, 3, 2, 1, 1],
      [1, 1, 2, 3, 3, 3, 2, 1, 1],
      [1, 1, 2, 2, 2, 2, 2, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 7 },
      { row: 2, col: 0 },
      { row: 3, col: 4 },
      { row: 4, col: 8 },
      { row: 5, col: 1 },
      { row: 6, col: 5 },
      { row: 7, col: 3 },
      { row: 8, col: 6 },
    ],
  },

  // Screenshot 13 (9x9 board with green, red, blue regions)
  {
    id: "forest-lake-9x9",
    name: "Forest Lake 9x9",
    description: "A 9x9 board inspired by forests and lakes",
    size: 9,
    colors: [
      "bg-red-200", // Light red
      "bg-green-200", // Light green
      "bg-gray-300", // Light gray
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-purple-200", // Light purple
      "bg-yellow-200", // Light yellow
      "bg-stone-400", // Dark gray/brown
      "bg-rose-300", // Light rose
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 4, 4, 4, 4],
      [1, 1, 2, 2, 3, 4, 4, 4, 4],
      [5, 5, 2, 2, 3, 4, 4, 8, 8],
      [5, 5, 6, 6, 6, 7, 7, 8, 8],
      [5, 5, 6, 6, 6, 7, 7, 8, 8],
      [5, 5, 6, 6, 6, 7, 7, 8, 8],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ],
    solution: [
      { row: 0, col: 4 },
      { row: 1, col: 7 },
      { row: 2, col: 1 },
      { row: 3, col: 5 },
      { row: 4, col: 3 },
      { row: 5, col: 8 },
      { row: 6, col: 0 },
      { row: 7, col: 6 },
      { row: 8, col: 2 },
    ],
  },
  // Screenshot 14 (8x8 board with purple, beige, green regions)
  {
    id: "mountains-valleys-8x8",
    name: "Mountains & Valleys 8x8",
    description: "An 8x8 board with landscapes inspired by nature",
    size: 8,
    colors: [
      "bg-purple-200", // Light purple
      "bg-stone-400", // Dark gray/brown
      "bg-gray-300", // Light gray
      "bg-red-200", // Light red
      "bg-yellow-200", // Light yellow
      "bg-green-200", // Light green
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 7, 7],
      [1, 1, 1, 4, 4, 1, 7, 7],
      [1, 1, 3, 3, 4, 4, 7, 7],
      [1, 2, 2, 3, 3, 6, 6, 6],
      [1, 2, 5, 5, 5, 6, 6, 6],
      [1, 2, 5, 5, 5, 6, 8, 8],
      [1, 2, 5, 5, 5, 8, 8, 8],
      [1, 2, 5, 5, 5, 8, 8, 8],
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 6 },
      { row: 2, col: 1 },
      { row: 3, col: 4 },
      { row: 4, col: 7 },
      { row: 5, col: 2 },
      { row: 6, col: 5 },
      { row: 7, col: 0 },
    ],
  },

  // Screenshot 15 (9x9 board with pink, green, gray regions)
  {
    id: "rose-garden-9x9",
    name: "Rose Garden 9x9",
    description: "A 9x9 board with rosy and green floral patterns",
    size: 9,
    colors: [
      "bg-rose-300", // Light rose
      "bg-green-200", // Light green
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
      "bg-yellow-200", // Light yellow
      "bg-blue-200", // Light blue
      "bg-amber-200", // Light orange
      "bg-purple-200", // Light purple
      "bg-red-200", // Light red
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 7],
      [1, 1, 1, 1, 1, 1, 1, 1, 7],
      [1, 1, 8, 8, 8, 8, 8, 1, 9],
      [1, 1, 8, 8, 8, 8, 8, 1, 9],
      [1, 1, 8, 8, 2, 8, 8, 9, 9],
      [1, 1, 8, 8, 2, 2, 2, 9, 9],
      [3, 3, 3, 3, 2, 2, 2, 9, 9],
      [3, 3, 3, 4, 4, 4, 4, 4, 4],
      [5, 5, 5, 4, 4, 4, 6, 6, 6],
    ],
    solution: [
      { row: 0, col: 4 },
      { row: 1, col: 8 },
      { row: 2, col: 1 },
      { row: 3, col: 6 },
      { row: 4, col: 0 },
      { row: 5, col: 3 },
      { row: 6, col: 7 },
      { row: 7, col: 2 },
      { row: 8, col: 5 },
    ],
  },

  // Screenshot 16 (9x9 board with purple, blue, yellow regions)
  {
    id: "lavender-fields-9x9",
    name: "Lavender Fields 9x9",
    description: "A 9x9 board with lavender and countryside colors",
    size: 9,
    colors: [
      "bg-purple-200", // Light purple
      "bg-amber-200", // Light orange
      "bg-blue-200", // Light blue
      "bg-gray-300", // Light gray
      "bg-yellow-200", // Light yellow
      "bg-green-200", // Light green
      "bg-red-200", // Light red
      "bg-stone-400", // Dark gray/brown
      "bg-rose-300", // Light rose
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 3, 3, 3, 3],
      [1, 1, 2, 2, 3, 3, 3, 3, 3],
      [4, 4, 2, 2, 3, 3, 5, 5, 5],
      [4, 4, 6, 6, 6, 5, 5, 5, 5],
      [4, 4, 6, 6, 6, 5, 5, 5, 5],
      [7, 7, 6, 6, 6, 6, 5, 9, 9],
      [7, 7, 7, 7, 8, 8, 8, 9, 9],
    ],
    solution: [
      { row: 0, col: 2 },
      { row: 1, col: 7 },
      { row: 2, col: 4 },
      { row: 3, col: 0 },
      { row: 4, col: 8 },
      { row: 5, col: 2 },
      { row: 6, col: 6 },
      { row: 7, col: 1 },
      { row: 8, col: 5 },
    ],
  },

  // Screenshot 17 (10x10 board with purple, green, orange regions)
  {
    id: "mystic-garden-10x10",
    name: "Mystic Garden 10x10",
    description: "A 10x10 board with mystical garden-inspired colors",
    size: 10,
    colors: [
      "bg-purple-200", // Light purple
      "bg-rose-300", // Light rose
      "bg-amber-200", // Light orange
      "bg-green-200", // Light green
      "bg-yellow-200", // Light yellow
      "bg-blue-200", // Light blue
      "bg-red-200", // Light red
      "bg-gray-300", // Light gray
      "bg-stone-400", // Dark gray/brown
      "bg-cyan-200", // Light cyan
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 6, 6, 6, 6, 6, 6, 6, 6],
      [1, 1, 6, 6, 6, 6, 6, 6, 6, 6],
      [1, 1, 6, 6, 2, 2, 3, 3, 6, 6],
      [1, 1, 6, 6, 2, 2, 3, 3, 6, 6],
      [7, 7, 6, 6, 4, 4, 5, 5, 6, 6],
      [7, 7, 6, 6, 4, 4, 5, 5, 6, 6],
      [7, 7, 8, 8, 8, 8, 9, 9, 9, 10],
      [7, 7, 8, 8, 8, 8, 9, 9, 9, 10],
    ],
    solution: [
      { row: 0, col: 3 },
      { row: 1, col: 8 },
      { row: 2, col: 1 },
      { row: 3, col: 6 },
      { row: 4, col: 9 },
      { row: 5, col: 4 },
      { row: 6, col: 7 },
      { row: 7, col: 0 },
      { row: 8, col: 5 },
      { row: 9, col: 2 },
    ],
  },

  // Screenshot 18 (9x9 board with red, purple, green regions)
  {
    id: "crimson-crown-9x9",
    name: "Crimson Crown 9x9",
    description: "A 9x9 board with rich crimson and purple regions",
    size: 9,
    colors: [
      "bg-red-200", // Light red
      "bg-purple-200", // Light purple
      "bg-yellow-200", // Light yellow
      "bg-gray-300", // Light gray
      "bg-blue-200", // Light blue
      "bg-amber-200", // Light orange
      "bg-green-200", // Light green
      "bg-rose-300", // Light rose
      "bg-stone-400", // Dark gray/brown
    ],
    initialColorLayout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 6, 6, 6, 1, 1, 1, 1, 1],
      [6, 6, 6, 6, 1, 1, 7, 1, 1],
      [6, 6, 6, 6, 1, 1, 7, 7, 1],
      [6, 6, 2, 2, 8, 7, 7, 7, 1],
      [6, 6, 2, 2, 8, 8, 7, 7, 1],
      [3, 3, 2, 2, 4, 8, 8, 8, 9],
      [3, 3, 2, 4, 4, 4, 5, 5, 9],
      [3, 3, 3, 4, 4, 4, 5, 5, 9],
    ],
    solution: [
      { row: 0, col: 5 },
      { row: 1, col: 0 },
      { row: 2, col: 7 },
      { row: 3, col: 3 },
      { row: 4, col: 6 },
      { row: 5, col: 1 },
      { row: 6, col: 8 },
      { row: 7, col: 2 },
      { row: 8, col: 4 },
    ],
  },
];
