import { Metadata } from "next";
import { getBookData } from "../../../services/bookService";
import SentimentAnalysisButton from "./SentimentAnalysisButton";

interface BookMetadata {
  title: string;
  author: string;
}

interface BookData {
  metadata: BookMetadata;
  content: string;
}

export const metadata: Metadata = {
  title: "Book Details",
};

export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const book: BookData = await getBookData(id);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-black mb-4">{book.metadata.title}</h1>
      <p className="text-black italic mb-6">{book.metadata.author}</p>

      <SentimentAnalysisButton bookContent={book.content} />

      <div className="bg-white text-gray-900 p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Book Content</h2>
        <pre className="text-black whitespace-pre-wrap overflow-auto text-sm">
          {book.content}
        </pre>
      </div>

    </div>
  );
}