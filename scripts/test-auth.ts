import http from "http";

async function makeRequest(
  path: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  } = {}
): Promise<{
  statusCode?: number;
  headers: http.IncomingHttpHeaders;
  body: string;
}> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:3000${path}`,
      {
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      }
    );

    req.on("error", reject);

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runAuthTests() {
  console.log("==================================================");
  console.log("   AURELIA SCHOOL PHASE 6 AUTH TEST SUITE");
  console.log("==================================================\n");

  // TEST 1: Unauthenticated access to /portal
  console.log("Test 1: Unauthenticated access to /portal");
  const unauthPortal = await makeRequest("/portal");
  console.log(`Status: ${unauthPortal.statusCode}, Location: ${unauthPortal.headers.location}`);
  const pass1 =
    (unauthPortal.statusCode === 307 || unauthPortal.statusCode === 302 || unauthPortal.statusCode === 308) &&
    unauthPortal.headers.location?.includes("/login?callbackUrl=");
  console.log(`Result: ${pass1 ? "PASS ✅" : "FAIL ❌"}\n`);

  // TEST 2: Unauthenticated access to /portal/student
  console.log("Test 2: Unauthenticated access to /portal/student");
  const unauthStudent = await makeRequest("/portal/student");
  console.log(`Status: ${unauthStudent.statusCode}, Location: ${unauthStudent.headers.location}`);
  const pass2 =
    (unauthStudent.statusCode === 307 || unauthStudent.statusCode === 302 || unauthStudent.statusCode === 308) &&
    unauthStudent.headers.location?.includes("/login?callbackUrl=");
  console.log(`Result: ${pass2 ? "PASS ✅" : "FAIL ❌"}\n`);

  // TEST 3: Login as Student via CSRF + Credentials
  console.log("Test 3: Credentials Login as Student (Eleanor Vance)");
  const csrfRes = await makeRequest("/api/auth/csrf");
  const csrfCookies = csrfRes.headers["set-cookie"] || [];
  const csrfCookie = csrfCookies.map((c) => c.split(";")[0]).join("; ");
  const csrfToken = JSON.parse(csrfRes.body).csrfToken;
  console.log(`CSRF Token obtained: ${csrfToken ? "Yes ✅" : "No ❌"}`);

  const studentLoginRes = await makeRequest("/api/auth/callback/credentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: csrfCookie,
    },
    body: new URLSearchParams({
      csrfToken,
      email: "eleanor.vance@student.aureliaschool.org",
      password: "Password123!",
    }).toString(),
  });

  const sessionCookies = studentLoginRes.headers["set-cookie"] || [];
  const sessionCookie = sessionCookies.map((c) => c.split(";")[0]).join("; ");
  console.log(`Student Login Status: ${studentLoginRes.statusCode}`);
  console.log(`Session Cookie Set: ${sessionCookie ? "Yes ✅" : "No ❌"}`);

  // TEST 4: Student accessing /portal (should redirect to /portal/student)
  console.log("\nTest 4: Authenticated Student accessing /portal");
  const studentPortal = await makeRequest("/portal", {
    headers: { Cookie: sessionCookie },
  });
  console.log(`Status: ${studentPortal.statusCode}, Location: ${studentPortal.headers.location}`);
  const pass4 = studentPortal.headers.location?.includes("/portal/student");
  console.log(`Result: ${pass4 ? "PASS ✅" : "FAIL ❌"}`);

  // TEST 5: Student accessing /portal/student (should be HTTP 200)
  console.log("\nTest 5: Student accessing /portal/student");
  const studentHub = await makeRequest("/portal/student", {
    headers: { Cookie: sessionCookie },
  });
  console.log(`Status: ${studentHub.statusCode}`);
  const pass5 = studentHub.statusCode === 200 && studentHub.body.includes("Eleanor Vance");
  console.log(`Contains Eleanor Vance: ${studentHub.body.includes("Eleanor Vance") ? "Yes ✅" : "No ❌"}`);
  console.log(`Result: ${pass5 ? "PASS ✅" : "FAIL ❌"}`);

  // TEST 6: Student trying to access /portal/teacher (Role check: redirect to /portal/unauthorized)
  console.log("\nTest 6: Student attempting to access /portal/teacher");
  const studentOnTeacher = await makeRequest("/portal/teacher", {
    headers: { Cookie: sessionCookie },
  });
  console.log(`Status: ${studentOnTeacher.statusCode}, Location: ${studentOnTeacher.headers.location}`);
  const pass6 = studentOnTeacher.headers.location?.includes("/portal/unauthorized");
  console.log(`Result: ${pass6 ? "PASS ✅" : "FAIL ❌"}`);

  // TEST 7: Logged-in user visiting /login (redirect to portal home)
  console.log("\nTest 7: Logged-in Student visiting /login");
  const studentOnLogin = await makeRequest("/login", {
    headers: { Cookie: sessionCookie },
  });
  console.log(`Status: ${studentOnLogin.statusCode}, Location: ${studentOnLogin.headers.location}`);
  const pass7 = studentOnLogin.headers.location?.includes("/portal/student");
  console.log(`Result: ${pass7 ? "PASS ✅" : "FAIL ❌"}`);

  // TEST 8: Teacher Login (Dr. Alistair Sterling)
  console.log("\nTest 8: Teacher Login (Dr. Alistair Sterling)");
  const teacherLoginRes = await makeRequest("/api/auth/callback/credentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: csrfCookie,
    },
    body: new URLSearchParams({
      csrfToken,
      email: "a.sterling@faculty.aureliaschool.org",
      password: "Password123!",
    }).toString(),
  });

  const teacherCookies = teacherLoginRes.headers["set-cookie"] || [];
  const teacherSession = teacherCookies.map((c) => c.split(";")[0]).join("; ");
  console.log(`Teacher Login Status: ${teacherLoginRes.statusCode}`);

  const teacherHub = await makeRequest("/portal/teacher", {
    headers: { Cookie: teacherSession },
  });
  console.log(`Teacher Hub Status: ${teacherHub.statusCode}`);
  const pass8 = teacherHub.statusCode === 200 && teacherHub.body.includes("Dr. Alistair Sterling");
  console.log(`Contains Dr. Alistair Sterling: ${teacherHub.body.includes("Dr. Alistair Sterling") ? "Yes ✅" : "No ❌"}`);
  console.log(`Result: ${pass8 ? "PASS ✅" : "FAIL ❌"}`);

  // TEST 9: Parent Login (Claire Montgomery)
  console.log("\nTest 9: Parent Login (Claire Montgomery)");
  const parentLoginRes = await makeRequest("/api/auth/callback/credentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: csrfCookie,
    },
    body: new URLSearchParams({
      csrfToken,
      email: "claire.montgomery@parent.aureliaschool.org",
      password: "Password123!",
    }).toString(),
  });

  const parentCookies = parentLoginRes.headers["set-cookie"] || [];
  const parentSession = parentCookies.map((c) => c.split(";")[0]).join("; ");
  console.log(`Parent Login Status: ${parentLoginRes.statusCode}`);

  const parentHub = await makeRequest("/portal/parent", {
    headers: { Cookie: parentSession },
  });
  console.log(`Parent Hub Status: ${parentHub.statusCode}`);
  const pass9 = parentHub.statusCode === 200 && parentHub.body.includes("Claire Montgomery");
  console.log(`Contains Claire Montgomery: ${parentHub.body.includes("Claire Montgomery") ? "Yes ✅" : "No ❌"}`);
  console.log(`Result: ${pass9 ? "PASS ✅" : "FAIL ❌"}`);

  // TEST 10: Wrong password verification
  console.log("\nTest 10: Wrong Password Verification");
  const badLoginRes = await makeRequest("/api/auth/callback/credentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: csrfCookie,
    },
    body: new URLSearchParams({
      csrfToken,
      email: "eleanor.vance@student.aureliaschool.org",
      password: "WrongPassword999!",
    }).toString(),
  });
  console.log(`Status: ${badLoginRes.statusCode}, Location: ${badLoginRes.headers.location}`);
  const pass10 = badLoginRes.headers.location?.includes("error=CredentialsSignin") || badLoginRes.headers.location?.includes("error=");
  console.log(`Result: ${pass10 ? "PASS (Properly Rejected) ✅" : "FAIL ❌"}`);

  console.log("\n==================================================");
  console.log("   ALL TEST SCENARIOS COMPLETED");
  console.log("==================================================");
}

runAuthTests().catch(console.error);
