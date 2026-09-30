async function checkPages() {
  const pages = ["/about", "/academics", "/admissions", "/contact"];
  for (const page of pages) {
    const res = await fetch(`http://localhost:3000${page}`);
    const text = await res.text();
    console.log(`\n=== PAGE: ${page} (Status: ${res.status}) ===`);
    
    // Check title tag
    const titleMatch = text.match(/<title>(.*?)<\/title>/);
    console.log("Title:", titleMatch ? titleMatch[1] : "NONE");

    // Check meta description
    const descMatch = text.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    console.log("Description:", descMatch ? descMatch[1] : "NONE");

    // Check PageHero presence
    const hasHero = text.includes("font-serif") && text.includes("min-h-[55svh]");
    console.log("PageHero present:", hasHero);

    // Check specific elements per page
    if (page === "/about") {
      console.log("Our Story present:", text.includes("Foundational Creed") || text.includes("Dame Margaret Thorne"));
      console.log("Vision & Mission present:", text.includes("Our Vision") && text.includes("Our Mission"));
      console.log("Core Values present:", text.includes("Curiosity") && text.includes("Integrity") && text.includes("Service"));
      console.log("Timeline present:", text.includes("1998") && text.includes("2026"));
      console.log("Leadership present:", text.includes("Principal") && text.includes("Head of Academics"));
      console.log("Numbers Strip & CTA present:", text.includes("Years of Distinction") && text.includes("Explore Admissions"));
    } else if (page === "/academics") {
      console.log("Learning Journey present:", text.includes("Learning Journey") && text.includes("Pre-Primary"));
      console.log("Curriculum Highlights present:", text.includes("Curriculum Highlights") && text.includes("Languages &amp; Linguistics"));
      console.log("Facilities bento present:", text.includes("World-Class Learning Facilities") && text.includes("Cavendish Science"));
      console.log("Co-curricular present:", text.includes("Co-Curricular") && text.includes("Sports"));
      console.log("Teaching approach present:", text.includes("Learn") && text.includes("Apply") && text.includes("Reflect"));
    } else if (page === "/admissions") {
      console.log("Admission Stepper present:", text.includes("Enquiry") && text.includes("Campus Discovery"));
      console.log("Eligibility Table present:", text.includes("Eligibility &amp; Age Criteria"));
      console.log("Fee Structure present:", text.includes("Transparent Tuition") && text.includes("Illustrative Demonstration Disclaimer"));
      console.log("Important Dates present:", text.includes("Key Dates") && text.includes("Admissions Applications Open"));
      console.log("FAQ Accordion present:", text.includes("Frequently Asked Questions"));
      console.log("Enquiry Form present:", text.includes("Begin Your Child") && text.includes("enquiry-form"));
    } else if (page === "/contact") {
      console.log("Contact Cards present:", text.includes("Campus Location") && text.includes("Direct Telephony"));
      console.log("Working Hours present:", text.includes("School Office &amp; Admissions Hours"));
      console.log("Contact Form present:", text.includes("Send Our Secretariat a Message"));
      console.log("SVG Map present:", text.includes("SERPENTINE WATERWAY") && text.includes("THE QUADRANGLE"));
      console.log("Visitor FAQ present:", text.includes("Frequently Asked Visiting Queries"));
    }
  }
}

checkPages().catch(console.error);
