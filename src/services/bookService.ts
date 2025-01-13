'use server'

import { Book, Metadata, BookDocument } from "../models/Book";
import * as cheerio from 'cheerio';

async function fetchBookFromGutenberg(bookId: string): Promise<Omit<BookDocument, "_id">> {
  const contentUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`;
  const metadataUrl = `https://www.gutenberg.org/ebooks/${bookId}`;

  const [contentResponse, metadataResponse] = await Promise.all([
    fetch(contentUrl),
    fetch(metadataUrl),
  ]);

  if (!contentResponse.ok || !metadataResponse.ok) {
    throw new Error("Failed to fetch book data");
  }

  const [content, metadataHtml] = await Promise.all([contentResponse.text(), metadataResponse.text()])

  const metadata: Metadata = await extractMetadata(metadataHtml);

  return { external_id: Number(bookId), content, metadata } as BookDocument;
}

async function extractMetadata(html: string): Promise<Metadata> {
  const $ = cheerio.load(html);
  const title = $('td[itemprop="headline"]').text().trim();
  const author = $('a[itemprop="creator"]').text().trim();
  return { title, author };
}

export async function getBookData(bookId: string): Promise<BookDocument> {
  let book = await Book.findOne({ external_id: bookId }).exec();
  if (!book) {
    const data = await fetchBookFromGutenberg(bookId);
    book = new Book(data);
    await book.save();
  }

  return book;
}

export async function findAllBooks(){
  return Book.find();
}

export async function connectToMongooseAndFindAllBooks(){
  await import("../utils/dbConnect");
  return Book.find();
}