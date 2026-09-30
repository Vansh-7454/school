import mongoose from "mongoose";
import { submitEnquiry } from "../src/app/actions/enquiry";
import { submitContact } from "../src/app/actions/contact";
import { Enquiry } from "../src/models/Enquiry";
import { ContactMessage } from "../src/models/ContactMessage";

async function testForms() {
  console.log("=== TESTING FORM SUBMISSIONS END-TO-END ===");
  
  // 1. Test Admissions Enquiry Form
  console.log("\n1. Submitting Admissions Enquiry...");
  const enquiryFormData = new FormData();
  enquiryFormData.append("parentName", "Dr. Jonathan Sterling");
  enquiryFormData.append("email", "jonathan.sterling@oxford.alumni.org");
  enquiryFormData.append("phone", "+44 20 7946 0888");
  enquiryFormData.append("childName", "Aria Sterling");
  enquiryFormData.append("grade", "Cambridge IGCSE (Grades 9-10)");
  enquiryFormData.append("visitDate", "2026-10-15");
  enquiryFormData.append(
    "message",
    "We are relocating from Oxford and would like to arrange an academic tour focusing on physics laboratories."
  );

  const enquiryResult = await submitEnquiry({}, enquiryFormData);
  console.log("Enquiry Result:", enquiryResult);

  // 2. Test Contact Form
  console.log("\n2. Submitting Contact Message...");
  const contactFormData = new FormData();
  contactFormData.append("name", "Lady Beatrice Montgomery");
  contactFormData.append("email", "beatrice.montgomery@kensington.co.uk");
  contactFormData.append("subject", "Schedule Private Campus Tour");
  contactFormData.append(
    "message",
    "Good afternoon. We would like to request an individual tour of the collegiate estate for our family next Tuesday."
  );

  const contactResult = await submitContact({}, contactFormData);
  console.log("Contact Result:", contactResult);

  // 3. Query MongoDB to verify data was saved
  console.log("\n3. Querying MongoDB to verify saved records...");
  await mongoose.connect("mongodb://localhost:27017/aurelia_school");
  
  const savedEnquiries = await Enquiry.find({ email: "jonathan.sterling@oxford.alumni.org" }).lean();
  console.log("Found Saved Enquiries in MongoDB:", savedEnquiries.length);
  console.log(JSON.stringify(savedEnquiries, null, 2));

  const savedMessages = await ContactMessage.find({ email: "beatrice.montgomery@kensington.co.uk" }).lean();
  console.log("Found Saved Contact Messages in MongoDB:", savedMessages.length);
  console.log(JSON.stringify(savedMessages, null, 2));

  await mongoose.disconnect();
}

testForms().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
