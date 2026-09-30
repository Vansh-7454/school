import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAssignment extends Document {
  grade: string;
  section: string;
  subject: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: "Pending" | "Submitted" | "Graded";
  gradeResult?: string;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    grade: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Submitted", "Graded"],
      default: "Pending",
      required: true,
    },
    gradeResult: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Assignment: Model<IAssignment> =
  (mongoose.models && mongoose.models.Assignment) ||
  mongoose.model<IAssignment>("Assignment", AssignmentSchema);

export default Assignment;
