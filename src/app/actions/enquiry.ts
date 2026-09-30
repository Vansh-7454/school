"use server";

import { z } from "zod";
import connectToDatabase from "@/lib/db";
import { Enquiry } from "@/models/Enquiry";

const FullEnquirySchema = z.object({
  parentName: z
    .string()
    .min(2, "Parent name must be at least 2 characters")
    .max(80, "Parent name cannot exceed 80 characters"),
  email: z
    .string()
    .email("Please provide a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid telephone number")
    .max(25, "Telephone number is too long"),
  childName: z
    .string()
    .min(2, "Child's name must be at least 2 characters")
    .max(80, "Child's name cannot exceed 80 characters")
    .optional()
    .or(z.literal("")),
  grade: z
    .string()
    .min(1, "Please select the prospective entry stage / grade"),
  visitDate: z
    .string()
    .optional(),
  message: z
    .string()
    .max(2000, "Message cannot exceed 2000 characters")
    .optional()
    .or(z.literal("")),
});

export type EnquiryFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitEnquiry(
  prevState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const rawData = {
    parentName: formData.get("parentName"),
    email: formData.get("email") || `${String(formData.get("parentName") || "parent").toLowerCase().replace(/\s+/g, ".")}@enquiry.local`,
    phone: formData.get("phone"),
    childName: formData.get("childName") || undefined,
    grade: formData.get("grade"),
    visitDate: formData.get("visitDate") || undefined,
    message: formData.get("message") || undefined,
  };

  const validation = FullEnquirySchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  const { parentName, email, phone, childName, grade, visitDate, message } = validation.data;

  try {
    await connectToDatabase();
    await Enquiry.create({
      parentName,
      phone,
      email,
      childName: childName || "Prospective Scholar",
      grade,
      preferredVisitDate: visitDate || undefined,
      message: message || `Enquiry for ${grade}. Preferred visit: ${visitDate || "Flexible"}`,
      status: "new",
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Thank you for your enquiry. Our Admissions Registrar will be in touch within 24 hours.",
    };
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return {
      success: false,
      message: "We encountered an issue recording your enquiry. Please verify your details and try again, or email us at admissions@aurelia.edu.",
    };
  }
}
