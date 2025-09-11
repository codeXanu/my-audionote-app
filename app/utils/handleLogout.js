'use client'
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

/**
 * Logs the user out and redirects using Next.js router.
 * @param {object} router - Next.js router instance from useRouter()
 */
export const handleLogout = async (router) => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};