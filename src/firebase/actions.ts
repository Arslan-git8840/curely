"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export async function createSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000,
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function Signup(params: SignUpParams) {
  const { fullName, email, password, uid } = params;
  if (!fullName || !email || !password || !uid)
    return {
      error: "Please fill out all fields",
      success: false,
    };
  try {
    const existedUser = await db.collection("users").doc(uid).get();
    if (existedUser.exists)
      return {
        error: "User already exists, please login",
        success: false,
      };

    await db.collection("users").doc(uid).set({
      fullName,
      email,
      password,
      uid,
    });

    return {
      error: null,
      message: "Account created successfully. Please sign in.",
      success: true,
    };
  } catch (e: any) {
    console.log("failed to save user", e);
    return {
      error: e,
      success: false,
    };
  }
}

export async function Login(params: LoginParams) {
  const { email, idToken } = params;
  if (!email || !idToken)
    return {
      error: "Please fill out all fields",
      success: false,
    };
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        error: "User not found, please sign up",
        success: false,
      };
    await createSessionCookie(idToken);
    return {
      error: null,
      message: "Welcome to the platform",
      success: true,
    };
  } catch (error) {
    console.log("Failed to login", error);
    return {
      error: error instanceof Error ? error.message : String(error),
      success: false,
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) return null;

    // Verify Firebase session cookie
    // const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // // Retrieve user from Firestore
    // const userDoc = await db.collection("users").doc(decodedClaims.uid).get();
    // const userData = userDoc.data();

    // if (!userDoc.exists || !userData) return null;

    // return {
    //   ...userData,
    //   id: userDoc.id,
    // } as User;
    return true;
  } catch (error) {
    console.log("Error in getCurrentUser:", error);
    return null;
  }
}

export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  // return !!user;
  return user;
}

export async function getUserId() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) return null;

    // Verify Firebase session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Retrieve user from Firestore
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();
    const userData = userDoc.data();

    if (!userDoc.exists || !userData) return null;

    return { userDoc, userData };
  } catch (error) {
    console.log("Error in getCurrentUser:", error);
    return null;
  }
}
