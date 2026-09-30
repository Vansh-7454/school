import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IEnquiry extends Document {
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  grade: string;
  preferredVisitDate?: string;
  message: string;
  status: "new" | "contacted" | "enrolled" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    parentName: {
      type: String,
      required: [true, "Parent name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      trim: true,
    },
    childName: {
      type: String,
      required: [true, "Child name is required"],
      trim: true,
    },
    grade: {
      type: String,
      required: [true, "Grade/Year applying for is required"],
      trim: true,
    },
    preferredVisitDate: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "enrolled", "closed"],
      default: "new",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry: Model<IEnquiry> =
  (mongoose.models && mongoose.models.Enquiry) ||
  mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
