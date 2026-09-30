import mongoose from "mongoose";
import { Enquiry } from "../src/models/Enquiry";
import { ContactMessage } from "../src/models/ContactMessage";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/aurelia_school");
  const enquiries = await Enquiry.find().lean();
  const contactMessages = await ContactMessage.find().lean();
  console.log("=== MONGO DB VERIFICATION ===");
  console.log("Enquiries count:", enquiries.length);
  console.log("Enquiries:", JSON.stringify(enquiries, null, 2));
  console.log("Contact Messages count:", contactMessages.length);
  console.log("Contact Messages:", JSON.stringify(contactMessages, null, 2));
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
