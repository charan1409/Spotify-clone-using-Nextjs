import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();
        User.findOne({ email: profile.email }).then(async (user) => {
          if (!user) {
            await User.create({
              name: profile.name,
              email: profile.email,
            });
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
