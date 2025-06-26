import { collection, getDocs, query,
  orderBy, doc, setDoc, arrayUnion, serverTimestamp, 
  getDoc} from "firebase/firestore";
import { firebaseDb } from "@/firebase/client";

export async function getAllConsultants() {
  const consultantsRef = collection(firebaseDb, "consultants");
  const consultantsQuery = query(consultantsRef, orderBy("id", "asc")); // 🔑 order by your `id` field

  try {
    const snapshot = await getDocs(consultantsQuery);
    const consultants: Consultant[] = snapshot.docs.map(doc => ({
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
