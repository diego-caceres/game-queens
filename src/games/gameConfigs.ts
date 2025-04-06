import { GameConfig } from "../components/types";

const defaultConfigs: GameConfig[] = [
  // Screenshot 1 (8x8 board with green, blue, orange regions)

  // {
  //   id: "mixed-regions-8x8-1",
  //   name: "Mixed Regions 8x8",
  //   description: "A diverse 8x8 board with multiple colored regions",
  //   size: 8,
  //   colors: [
  //     "#60a5fa",
  //     "#f87171",
  //     "#4ade80",
  //     "#c084fc",
  //     "#fde047",
  //     "#f472b6",
  //     "#fb923c",
  //     "#9ca3af",
  //   ],
  //   initialColorLayout: [
  //     [1, 1, 1, 1, 1, 2, 2, 2],
  //     [1, 1, 1, 1, 1, 2, 2, 2],
  //     [7, 3, 3, 3, 3, 3, 2, 2],
  //     [7, 7, 3, 3, 3, 3, 2, 2],
  //     [7, 3, 3, 3, 3, 4, 3, 3],
  //     [7, 3, 3, 3, 3, 3, 3, 3],
  //     [6, 3, 3, 3, 3, 3, 3, 3],
  //     [6, 7, 7, 3, 3, 8, 8, 8],
  //   ],
  //   solution: [
  //     {
  //       row: 0,
  //       col: 3,
  //     },
  //     {
  //       row: 1,
  //       col: 7,
  //     },
  //     {
  //       row: 2,
  //       col: 5,
  //     },
  //     {
  //       row: 3,
  //       col: 1,
  //     },
  //     {
  //       row: 4,
  //       col: 6,
  //     },
  //     {
  //       row: 5,
  //       col: 2,
  //     },
  //     {
  //       row: 6,
  //       col: 0,
  //     },
  //     {
  //       row: 7,
  //       col: 4,
  //     },
  //   ],
  // },
  {
    id: "simple-7x7",
    name: "Simple 7x7",
    description: "A 7x7 custom board",
    size: 7,
    colors: [
      "#60a5fa",
      "#f87171",
      "#4ade80",
      "#c084fc",
      "#fde047",
      "#f472b6",
      "#fb923c",
    ],
    initialColorLayout: [
      [4, 4, 4, 4, 4, 4, 4],
      [7, 7, 7, 7, 1, 4, 4],
      [7, 3, 3, 6, 1, 4, 4],
      [7, 7, 6, 6, 6, 4, 4],
      [7, 7, 2, 6, 5, 5, 4],
      [7, 7, 2, 7, 7, 7, 4],
      [7, 7, 7, 7, 7, 7, 4],
    ],
    solution: [
      {
        row: 0,
        col: 6,
      },
      {
        row: 1,
        col: 4,
      },
      {
        row: 2,
        col: 1,
      },
      {
        row: 3,
        col: 3,
      },
      {
        row: 4,
        col: 5,
      },
      {
        row: 5,
        col: 2,
      },
      {
        row: 6,
        col: 0,
      },
    ],
  },
  {
    id: "heart-in-9x9",
    name: "Heart in 9x9",
    description: "A 9x9 custom board",
    size: 9,
    colors: [
      "#60a5fa",
      "#f87171",
      "#4ade80",
      "#c084fc",
      "#fde047",
      "#9ca3af",
      "#f472b6",
      "#fb923c",
      "#94a3b8",
    ],
    initialColorLayout: [
      [4, 4, 8, 8, 1, 7, 7, 7, 7],
      [4, 4, 8, 1, 1, 1, 9, 9, 7],
      [4, 4, 2, 2, 1, 2, 2, 9, 7],
      [4, 2, 2, 2, 2, 2, 2, 2, 7],
      [4, 2, 2, 2, 2, 2, 2, 2, 7],
      [4, 4, 2, 2, 2, 2, 2, 7, 7],
      [4, 4, 5, 2, 2, 2, 7, 7, 6],
      [4, 5, 5, 5, 2, 3, 7, 7, 6],
      [4, 4, 4, 5, 3, 3, 6, 6, 6],
    ],
    solution: [
      {
        row: 0,
        col: 3,
      },
      {
        row: 1,
        col: 6,
      },
      {
        row: 2,
        col: 4,
      },
      {
        row: 3,
        col: 1,
      },
      {
        row: 4,
        col: 8,
      },
      {
        row: 5,
        col: 0,
      },
      {
        row: 6,
        col: 2,
      },
      {
        row: 7,
        col: 5,
      },
      {
        row: 8,
        col: 7,
      },
    ],
  },
  {
    id: "green-tree-8x8",
    name: "Green Tree 8x8",
    description: "A 8x8 custom board",
    size: 8,
    colors: [
      "#60a5fa",
      "#f87171",
      "#4ade80",
      "#c084fc",
      "#fde047",
      "#9ca3af",
      "#f472b6",
      "#fb923c",
    ],
    initialColorLayout: [
      [8, 8, 8, 8, 8, 1, 1, 1],
      [8, 8, 3, 3, 3, 3, 1, 1],
      [6, 3, 3, 3, 4, 3, 3, 1],
      [6, 3, 2, 3, 3, 3, 3, 1],
      [6, 3, 3, 3, 3, 3, 3, 1],
      [6, 6, 3, 3, 3, 3, 1, 1],
      [6, 6, 5, 3, 3, 7, 1, 1],
      [6, 5, 5, 3, 3, 7, 7, 7],
    ],
    solution: [
      {
        row: 0,
        col: 3,
      },
      {
        row: 1,
        col: 7,
      },
      {
        row: 2,
        col: 4,
      },
      {
        row: 3,
        col: 2,
      },
      {
        row: 4,
        col: 6,
      },
      {
        row: 5,
        col: 0,
      },
      {
        row: 6,
        col: 5,
      },
      {
        row: 7,
        col: 1,
      },
    ],
  },
];

// Load configs from localStorage or use defaults
const loadConfigs = (): GameConfig[] => {
  if (typeof window === "undefined") return defaultConfigs;

  const savedConfigs = localStorage.getItem("gameConfigs");
  return savedConfigs ? JSON.parse(savedConfigs) : defaultConfigs;
};

export const gameConfigs = loadConfigs();

export const saveNewConfig = (config: GameConfig) => {
  const currentConfigs = loadConfigs();
  const newConfigs = [...currentConfigs, config];
  if (typeof window !== "undefined") {
    localStorage.setItem("gameConfigs", JSON.stringify(newConfigs));
  }
  // Update the exported configs array
  gameConfigs.length = 0;
  gameConfigs.push(...newConfigs);
};
