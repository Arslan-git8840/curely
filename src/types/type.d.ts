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

type Medication = {
  name: string;
  dosage: string;
  instructions: string;
};

type Diagnosis = {
  condition: string;
  details: string;
};

type Patient = {
  name: string;
  age: string | number;
  gender: string;
};

type ParsedReport = {
  generatedBy?: string;
  generatedOn?: string;
  patient?: Patient;
  summary?: string;
  symptoms?: string[];
  diagnosis?: Diagnosis;
  medications?: Medication[];
  lifestyleRecommendations?: string[];
  nextSteps?: string[];
  disclaimer?: string;
};

type ReportData = {
  report: ParsedReport | string;
  consultant?: {
    name: string;
    image: string;
  };
};
