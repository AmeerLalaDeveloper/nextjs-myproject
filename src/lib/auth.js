import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
const login = async (credentials) => {
  try {
    const result = await sql.query("SELECT * FROM users WHERE username = $1", [
      credentials.username,
    ]);

    if (!result.rows.length) throw new Error("Wrong credentials!");

    const user = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: "6e30c12fa6ab0904e335",
      clientSecret: "e71c8907b693009ce774242913e67857f75467f8",
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        try {
          const username = profile.login;
          const email = profile.email;
          const image = profile.avatar_url;
          const userEmail = user.email;
          const userFromDB = await sql.query(
            "SELECT * FROM users WHERE email = $1",
            [userEmail]
          );
          //if no user in db create one
          if (!userFromDB.rows.length) {
            await sql.query(
              "INSERT INTO users (username, email, image) VALUES ($1, $2, $3)",
              [username, email, image]
            );
          }
        } catch (err) {
          return false;
        }
      }
      return true;
    },
  },
  ...authConfig.callbacks,
});
