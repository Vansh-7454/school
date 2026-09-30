import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { authConfig } from "./auth.config";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { getDemoUser } from "@/lib/demoUsers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        // 1. Check if credentials match canonical demo accounts
        const demoUser = getDemoUser(email, password);
        if (demoUser) {
          // If MongoDB is actively connected, prefer using the database record if present
          try {
            if (mongoose.connection.readyState === 1) {
              const dbUser = await User.findOne({ email }).lean();
              if (dbUser) {
                return {
                  id: dbUser._id.toString(),
                  name: dbUser.name,
                  email: dbUser.email,
                  role: dbUser.role,
                };
              }
            }
          } catch {
            // Database is offline or error; proceed with demoUser
          }

          // Return demo user session
          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
          };
        }

        // 2. Standard Database lookup for custom/seeded users
        try {
          await connectToDatabase();
          const user = await User.findOne({ email }).lean();

          if (!user || !user.passwordHash) {
            return null;
          }

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) {
            return null;
          }

          // Return sanitized user object without passwordHash
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error during credential verification:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
