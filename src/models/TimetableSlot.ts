import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ITimetableSlot extends Document {
  grade: string;
  section: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  period: number;
  time: string;
  subject: string;
  teacherName: string;
  room: string;
}

const TimetableSlotSchema = new Schema<ITimetableSlot>(
  {
    grade: { type: String, required: true },
    section: { type: String, required: true },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      required: true,
    },
    period: { type: Number, required: true },
    time: { type: String, required: true },
    subject: { type: String, required: true },
    teacherName: { type: String, required: true },
    room: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const TimetableSlot: Model<ITimetableSlot> =
  (mongoose.models && mongoose.models.TimetableSlot) ||
  mongoose.model<ITimetableSlot>("TimetableSlot", TimetableSlotSchema);

export default TimetableSlot;
