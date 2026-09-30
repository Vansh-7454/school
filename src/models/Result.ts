import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IResult extends Document {
  studentId: mongoose.Types.ObjectId;
  term: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  teacherRemarks?: string;
}

const ResultSchema = new Schema<IResult>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    term: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    maxMarks: {
      type: Number,
      required: true,
      default: 100,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    teacherRemarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Result: Model<IResult> =
  (mongoose.models && mongoose.models.Result) ||
  mongoose.model<IResult>("Result", ResultSchema);

export default Result;
