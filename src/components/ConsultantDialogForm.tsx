"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { getAllConsultants } from "@/firebase/firestore/actions";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const dummyConsultants = [
  {
    id: "1",
    name: "Dr. AIDoc",
    specialty: "General Physician",
    description:
      "Expert in general health and diagnostics with fast response AI.",
    avatar: "/consultant-1.png",
  },
  {
    id: "2",
    name: "MindBot",
    specialty: "Mental Health",
    description: "Specialized in stress, anxiety, and mental wellness support.",
    avatar: "/consultant-2.png",
  },
  {
    id: "3",
    name: "SkinAI",
    specialty: "Dermatologist",
    description: "Handles skin conditions and visual dermatology cases.",
    avatar: "/consultant-3.png",
  },
];

export default function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState("");
  const router = useRouter();
  const [consultants, setConsultants] = useState<Consultant[]>([]);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const consultantsArray: Consultant[] = await getAllConsultants();
        console.log(consultantsArray);
        setConsultants(consultantsArray);
      } catch (error) {}
    };

    fetchConsultants();
  }, []);

  const handleStartConsultation = (assistant: string) => {
    router.push(
      `/consultation?assistant=${encodeURIComponent(
        assistant
      )}&problem=${encodeURIComponent(problem)}`
    );
  };

  return (
    <div className={`max-w-5xl mx-auto space-y-6 px-4 ${poppins.className}`}>
      {step === 1 && (
        <div className="space-y-4">
          <Label htmlFor="problem" className="text-lg font-medium">
            Please describe your medical issue in detail:
          </Label>
          <Textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g., I've been experiencing chest pain and shortness of breath for the past few days."
            rows={6}
            required
            className="resize-none"
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              onClick={() => setStep(2)}
              disabled={!problem.trim()}
              className="bg-[#019c6f] text-white hover:bg-[#017a59]"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-muted-foreground">
              Based on your input, here are AI consultants that can assist:
            </Label>
            <Button variant="ghost" onClick={() => setStep(1)}>
              ← Previous
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[75vh] pr-1">
            <div className="flex flex-wrap gap-6 justify-center">
              {consultants
                .filter((consultant) => consultant.accessType === "free")
                .map((consultant, index) => (
                  <Link href={`consultants/${consultant.sessionId}`}>
                  <motion.div
                    key={consultant.id}
                    className="w-full max-w-[350px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center mx-auto"
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Image
                      src={`/${consultant.image}`} // ensure you're using the correct path
                      alt={consultant.name}
                      width={90}
                      height={90}
                      className="rounded-full border mb-4 shadow-sm"
                    />
                    <h3 className="font-semibold text-[#0f172a] text-lg mb-1">
                      {consultant.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs bg-[#e6faf5] text-[#019c6f] px-3 py-1 rounded-full mb-2">
                      <Stethoscope size={14} /> {consultant.specialization}
                    </span>
                    <p className="text-sm text-[#475569] leading-relaxed mb-4">
                      {consultant.description}
                    </p>
                    <Button
                      onClick={() => handleStartConsultation(consultant.name)}
                      className="w-full bg-[#019c6f] text-white hover:bg-[#017a59]"
                    >
                      Start Consultation
                    </Button>
                  </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
