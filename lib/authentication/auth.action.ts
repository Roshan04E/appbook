"use server";

import { signIn, signOut } from "@/auth";

// sign in the user
export async function signInAction() {
  await signIn("google", { redirect: true });
}

// sign out
export async function signOutAction() {
  await signOut();
}
