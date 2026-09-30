import mongoose, { Schema, type Document, type Model } from "mongoose";

export type AnnouncementAudience = "all" | "student" | "teacher" | "parent";

export interface IAnnouncement extends Document {
  audience: AnnouncementAudience;
  title: string;
  body: string;
  date: Date;
  priority?: "normal" | "urgent";
  author?: string;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    audience: {
      type: String,
      enum: ["all", "student", "teacher", "parent"],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    priority: {
      type: String,
      enum: ["normal", "urgent"],
      default: "normal",
    },
    author: {
      type: String,
      default: "Head of School Office",
    },
  },
  {
    timestamps: true,
  }
);

export const Announcement: Model<IAnnouncement> =
  (mongoose.models && mongoose.models.Announcement) ||
  mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export default Announcement;
