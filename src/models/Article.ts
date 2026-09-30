import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ArticleCategory =
  | "Achievements"
  | "Campus News"
  | "Announcements"
  | "Student Voices";

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  body: string[];
  category: ArticleCategory;
  author: string;
  publishedAt: Date;
  featured: boolean;
  readTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
    },
    body: {
      type: [String],
      required: [true, "Body paragraphs are required"],
    },
    category: {
      type: String,
      enum: ["Achievements", "Campus News", "Announcements", "Student Voices"],
      required: [true, "Category is required"],
      index: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    readTime: {
      type: String,
      default: "4 min read",
    },
  },
  {
    timestamps: true,
  }
);

export const Article: Model<IArticle> =
  (mongoose.models && mongoose.models.Article) ||
  mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
