import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface INotice extends Document {
  title: string;
  slug: string;
  body: string;
  date: Date;
  category: string;
  important: boolean;
  attachmentLabel?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
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
    body: {
      type: String,
      required: [true, "Body content is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      default: "General",
    },
    important: {
      type: Boolean,
      default: false,
      index: true,
    },
    attachmentLabel: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notice: Model<INotice> =
  (mongoose.models && mongoose.models.Notice) ||
  mongoose.model<INotice>("Notice", NoticeSchema);

export default Notice;
