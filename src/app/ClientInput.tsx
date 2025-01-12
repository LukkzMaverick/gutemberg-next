"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientInput() {
  const [bookId, setBookId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bookId.trim()) {
      router.push(`/books/${bookId}`);
    }
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        className="border border-gray-300 rounded-l-md p-2 flex-1 text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
