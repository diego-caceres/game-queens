"use client";

import { BoardCreator } from "@/components/BoardCreator";

export default function CreatePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Board</h1>
      <BoardCreator />
    </div>
  );
}
