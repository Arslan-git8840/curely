import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFriendlyFirebaseError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email is already in use.";
    case "auth/invalid-email":
      return "Please enter a valid email.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
}