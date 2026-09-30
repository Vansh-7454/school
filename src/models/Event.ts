import mongoose, { Schema, type Document, type Model } from "mongoose";

export type EventCategory = "Academic" | "Sports" | "Cultural" | "Community";

export interface IEvent extends Document {
  title: string;
  slug: string;
  category: EventCategory;
  date: Date;
  time: string;
  location: string;
  summary: string;
  description: string;
  longDescription?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
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
    category: {
      type: String,
      enum: ["Academic", "Sports", "Cultural", "Community"],
      required: [true, "Category is required"],
      default: "Academic",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    longDescription: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Event: Model<IEvent> =
  (mongoose.models && mongoose.models.Event) ||
  mongoose.model<IEvent>("Event", EventSchema);

export default Event;
