import { google } from "@/lib/gemini";
import { NextResponse } from "next/server";
import { generateText } from "ai";
import { db } from "@/firebase/admin"; // ✅ Firestore admin
import * as admin from "firebase-admin"; // needed for timestamp types
import { time } from "console";

type Message = {
  sender: "user" | "assistant";
  text: string;
};

export async function POST(req: Request) {
  try {
    const {
      conversation,
      sessionId,
      userId,
    }: { conversation: Message[]; sessionId: string; userId: string } =
      await req.json();

    // const conversation = [
    //   {
    //     role: "assistant",
    //     text: "Hello! I'm your AI health assistant. To begin, could you please tell me your name and age?",
    //   },
    //   { role: "user", text: "Hi, I'm Sarah and I'm 28 years old." },
    //   {
    //     role: "assistant",
    //     text: "Thanks, Sarah. How can I help you today? Are you experiencing any health issues?",
    //   },
    //   {
    //     role: "user",
    //     text: "Yes, I've been feeling very tired lately, especially in the mornings.",
    //   },
    //   { role: "assistant", text: "I see. How long has this been happening?" },
    //   { role: "user", text: "For about two weeks now." },
    //   {
    //     role: "assistant",
    //     text: "Are there any other symptoms? For example, headaches, changes in weight, or difficulty sleeping?",
    //   },
    //   {
    //     role: "user",
    //     text: "I’m sleeping more than usual but still feel groggy during the day.",
    //   },
    //   {
    //     role: "assistant",
    //     text: "Understood. Have you been under any stress or emotional strain recently?",
    //   },
    //   { role: "user", text: "Yes, work has been a bit stressful." },
    //   {
    //     role: "assistant",
    //     text: "Thank you for the details. I’ll now prepare a report with possible causes, medication suggestions, and next steps.",
    //   },
    // ];

    // Format the conversation into a readable string

    const formattedConversation = conversation
      .map(
        (msg) => `${msg.sender === "user" ? "User" : "AI Doctor"}: ${msg.text}`
      )
      .join("\n");

    const { text: reportResponse } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are an AI medical consultant named Dr. Curely AI.

Given the following conversation between a patient and you, generate a medical report **strictly in JSON format**, with the following structure:

{
  "generatedBy": "Dr. Curely AI",
  "generatedOn": "<today’s date in YYYY-MM-DD>",
  "patientName": "<Patient Name>",
  "patient": {
    "name": "<Patient Name>",
    "age": <Patient Age>,
    "gender": "<Male | Female | Other>"
  },
  "summary": "<Brief overview of the patient’s health and what the report includes>",
  "symptoms": ["<Symptom 1>", "<Symptom 2>", "..."],
  "diagnosis": {
    "condition": "<Medical condition name>",
    "details": "<Detailed explanation of the diagnosis>"
  },
  "medications": [
    {
      "name": "<Medication Name>",
      "dosage": "<Dosage>",
      "instructions": "<How to take it>"
    }
  ],
  "lifestyleRecommendations": ["<Lifestyle advice 1>", "<...>"],
  "nextSteps": ["<Follow-up recommendation 1>", "<...>"],
  "disclaimer": "This report is AI-generated based on your input. Please consult a licensed physician before taking any medication."
}

Here is the conversation:
${formattedConversation}

Only return the JSON. Do not include any explanation or additional text.
`,
    });

    const report = reportResponse
      .replace(/^```json\s*/i, "") // Remove ```json (case-insensitive)
      .replace(/^```/, "") // In case it's just ``` without json
      .replace(/```$/, "") // Remove ending backticks
      .trim();

    console.log(reportResponse);
    console.log(JSON.parse(report));
    // ✅ Save to Firestore
    const consultantSnapshot = await db
      .collection("consultants")
      .where("sessionId", "==", sessionId)
      .limit(1)
      .get();

    if (consultantSnapshot.empty) {
      throw new Error("No consultant found with this sessionId");
    }

    // Step 2: Get the document reference
    const consultantRef = consultantSnapshot.docs[0].ref;

    // Step 3: Add the ai-report with consultantRef
    const docRef = await db.collection("ai-reports").add({
      conversation,
      report,
      sessionId,
      userRef: db.collection("users").doc(userId),
      consultantRef, // store the document reference
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: docRef.id, report },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
