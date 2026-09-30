import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IStudent extends Document {
  userId: mongoose.Types.ObjectId;
  grade: string;
  section: string;
  rollNo: string;
  guardianUserId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    rollNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    guardianUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Student: Model<IStudent> =
  (mongoose.models && mongoose.models.Student) ||
  mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
