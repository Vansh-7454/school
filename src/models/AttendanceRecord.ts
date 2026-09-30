import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAttendanceRecord extends Document {
  studentId: mongoose.Types.ObjectId;
  date: Date;
  status: "Present" | "Late" | "Excused" | "Absent";
  remarks?: string;
}

const AttendanceRecordSchema = new Schema<IAttendanceRecord>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Present", "Late", "Excused", "Absent"],
      default: "Present",
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const AttendanceRecord: Model<IAttendanceRecord> =
  (mongoose.models && mongoose.models.AttendanceRecord) ||
  mongoose.model<IAttendanceRecord>("AttendanceRecord", AttendanceRecordSchema);

export default AttendanceRecord;
