import Link from "next/link";
import { findAllBooks } from "@/services/bookService";
import ClientInput from "./ClientInput";

export default async function HomePage() {
  const books = await findAllBooks();

  const serializedBooks = books.map((book: any) => ({
    id: book.external_id.toString(),
    title: book.metadata.title,
  })).sort((bookA, bookB) => bookA.title.localeCompare(bookB.title));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-black mb-6">Project Gutenberg Explorer</h1>
      <ClientInput />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Books You've Accessed</h2>
        {serializedBooks.length === 0 ? (
          <p className="text-gray-600">No books accessed yet.</p>
        ) : (
          <ul className="space-y-4">
            {serializedBooks.map((book) => (
              <li key={book.id} className="text-blue-600 hover:underline">
                <Link href={`/books/${book.id}`}>{book.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
