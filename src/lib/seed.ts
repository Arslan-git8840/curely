import { collection, addDoc } from "firebase/firestore";
import { firebaseDb } from "@/firebase/client"; 
import { aiConsultants } from "@/data/dummyData";

export async function addAllConsultantsToFirestore() {
  const consultantsCollection = collection(firebaseDb, "consultants");

  try {
    for (const consultant of aiConsultants) {
      await addDoc(consultantsCollection, consultant);
      console.log(`✅ Added: ${consultant.name}`);
    }
    console.log("🎉 All consultants added to Firestore.");
  } catch (error) {
    console.error("❌ Error adding consultants: ", error);
  }
}
