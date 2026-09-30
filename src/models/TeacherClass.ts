import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ITeacherClass extends Document {
  teacherId: mongoose.Types.ObjectId;
  grade: string;
  section: string;
  subject: string;
  studentCount: number;
  room: string;
}

const TeacherClassSchema = new Schema<ITeacherClass>(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    studentCount: {
      type: Number,
      required: true,
      default: 20,
    },
    room: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TeacherClass: Model<ITeacherClass> =
  (mongoose.models && mongoose.models.TeacherClass) ||
  mongoose.model<ITeacherClass>("TeacherClass", TeacherClassSchema);

export default TeacherClass;
