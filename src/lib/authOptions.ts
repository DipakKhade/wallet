import GoogleProvider from "next-auth/providers/google";
import db from "@/db";
import { userAgent } from "next/server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async signIn(data: any) {
      if (data.account.provider !== "google") {
        return false;
      }
      try {
        const isUser = await db.user.findFirst({
          where: {
            email: data.user.email,
          },
        });

        if (isUser) {
          return true;
        }

        const create_user_wallet = await db.$transaction(async (tx) => {
          let new_user = await tx.user.create({
            data: {
              email: data.user.email,
              name: data.user.name,
              profilePicture: data.user.image,
            },
          });

          let new_user_wallet = await tx.userAccount.create({
            data: {
               userid:new_user.id
            },
          });

        });
        return true

      } catch (e) {
        console.log(e);
      }
    },
  },
};
