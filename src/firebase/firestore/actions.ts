import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  arrayUnion,
  serverTimestamp,
  getDoc,
  where,
} from "firebase/firestore";
import { firebaseDb } from "@/firebase/client";

export async function getAllConsultants() {
  const consultantsRef = collection(firebaseDb, "consultants");
  const consultantsQuery = query(consultantsRef, orderBy("id", "asc")); // 🔑 order by your `id` field

  try {
    const snapshot = await getDocs(consultantsQuery);
    const consultants: Consultant[] = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    })) as Consultant[];

    return consultants;
  } catch (error) {
    console.error("❌ Error fetching consultants:", error);
    return [];
  }
}

interface SaveChatOptions {
  sessionId: string;
  consultantId: number;
  message: {
    sender: "user" | "assistant";
    text: string;
    timestamp: number;
  };
}

export async function saveMessageToFirestore({
  sessionId,
  consultantId,
  message,
}: SaveChatOptions) {
  const chatRef = doc(firebaseDb, "chats", sessionId);

  try {
    await setDoc(
      chatRef,
      {
        sessionId,
        consultantId,
        messages: arrayUnion(message),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error("Error saving message to Firestore:", err);
  }
}

export async function getChatHistory(sessionId: string) {
  const docRef = doc(firebaseDb, "chats", sessionId);
  const chatSnap = await getDoc(docRef);

  if (chatSnap.exists()) {
    return chatSnap.data(); // includes messages[]
  } else {
    return null;
  }
}

export async function getAiReports(userId: string): Promise<any[]> {
  try {
    const userRef = doc(firebaseDb, "users", userId);

    const reportsRef = collection(firebaseDb, "ai-reports");
    const q = query(reportsRef, where("userRef", "==", userRef));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];

    const reports = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();

        // Unpack userRef
        let user = null;
        if (data.userRef) {
          const userDoc = await getDoc(data.userRef);
          user = userDoc.exists() ? userDoc.data() : null;
        }

        // Unpack consultantRef
        let consultant = null;
        if (data.consultantRef) {
          const consultantDoc = await getDoc(data.consultantRef);
          consultant = consultantDoc.exists() ? consultantDoc.data() : null;
        }

        return {
          id: docSnap.id,
          ...data,
          user, // 👈 resolved user data
          consultant, // 👈 resolved consultant data
        };
      })
    );

    return reports;
  } catch (error) {
    console.error("Error fetching AI reports:", error);
    throw error;
  }
}


export async function getAiReportById(reportId: string): Promise<any | null> {
  try {
    const reportDocRef = doc(firebaseDb, "ai-reports", reportId);
    const docSnap = await getDoc(reportDocRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();

    // Unpack userRef
    let user = null;
    if (data.userRef) {
      const userDoc = await getDoc(data.userRef);
      user = userDoc.exists() ? userDoc.data() : null;
    }

    // Unpack consultantRef
    let consultant = null;
    if (data.consultantRef) {
      const consultantDoc = await getDoc(data.consultantRef);
      consultant = consultantDoc.exists() ? consultantDoc.data() : null;
    }

    return {
      id: docSnap.id,
      ...data,
      user,
      consultant,
    };
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    throw error;
  }
}