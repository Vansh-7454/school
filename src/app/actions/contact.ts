"use server";

import { z } from "zod";
import connectToDatabase from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  email: z
    .string()
    .email("Please provide a valid email address"),
  subject: z
    .string()
    .min(2, "Please select or enter a subject")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const validation = ContactSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  const { name, email, subject, message } = validation.data;

  try {
    await connectToDatabase();
    await ContactMessage.create({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Thank you for getting in touch. Your message has been received by our Admissions & Enquiries team.",
    };
  } catch (error) {
    console.error("Contact submission error:", error);
    return {
      success: false,
      message: "We encountered an issue transmitting your message. Please check your network connection and try again, or reach out to reception@aurelia.edu.",
    };
  }
}
