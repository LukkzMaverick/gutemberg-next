import mongoose, { Schema, Document, model } from "mongoose";

export interface Metadata {
  title: string;
  author: string;
}

export interface BookDocument extends Document {
  external_id: number;
  content: string;
  metadata: Metadata;
}

const MetadataSchema = new Schema<Metadata>({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const BookSchema = new Schema<BookDocument>({
  external_id: { type: Number, required: true, unique: true },
  content: { type: String, required: true },
  metadata: { type: MetadataSchema, required: true },
});

export const Book = mongoose.models.Book || model<BookDocument>("Book", BookSchema);
