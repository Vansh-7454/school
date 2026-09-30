import mongoose, { Schema, type Document, type Model } from "mongoose";

export type GalleryCategory = "Sports" | "Arts" | "Science" | "Campus" | "Events";
export type GalleryAspect = "portrait" | "landscape" | "square";

export interface IGalleryItem extends Document {
  title: string;
  category: GalleryCategory;
  caption: string;
  artVariant: string;
  aspect: GalleryAspect;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Sports", "Arts", "Science", "Campus", "Events"],
      required: [true, "Category is required"],
      index: true,
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
      trim: true,
    },
    artVariant: {
      type: String,
      required: [true, "Art variant is required"],
      trim: true,
    },
    aspect: {
      type: String,
      enum: ["portrait", "landscape", "square"],
      default: "landscape",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GalleryItem: Model<IGalleryItem> =
  (mongoose.models && mongoose.models.GalleryItem) ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);

export default GalleryItem;
