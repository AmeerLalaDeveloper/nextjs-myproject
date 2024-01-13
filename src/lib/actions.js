"use server";

import { sql } from "@vercel/postgres";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState, formData) => {
  try {
    const { username, password, passwordRepeat, email, image } =
      Object.fromEntries(formData);
    if (password !== passwordRepeat) {
      return "Passwords does not match";
    }
    const user = await sql.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const userFound = user.rows.length;
    if (userFound) {
      return "username already exist";
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await sql.query(
      "INSERT INTO users (username, email, password,image) VALUES ($1, $2, $3,$4)",
      [username, email, hashedPassword, image]
    );
  } catch (err) {
    console.log("aha", err);
    return "Something went wrong";
  }
};

export const login = async (previousState, formData) => {
  try {
    const { username, password } = Object.fromEntries(formData);
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.type === "CredentialsSignin") {
      return { error: "Invalid username or password" };
    }
    throw new err();
  }
};
