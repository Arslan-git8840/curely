interface SignUpParams {
    fullName: string;
    email: string;
    password: string;
    uid: string;
}

interface LoginParams {
    email: string;
    idToken: string;
}

interface Consultant {
  id: number; 
  name: string;
  specialization: string;
  description: string;
  rating: number;
  image: string;
  agentPrompt: string;
  accessType: "free" | "premium";
  sessionId: string;
  docId?: string; // optional Firestore document ID, added on fetch
}

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  timestamp: number; // Date.now()
}