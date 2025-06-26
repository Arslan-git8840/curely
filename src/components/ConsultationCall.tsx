"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { vapi } from "@/lib/vapi";

interface ConsultationCallProps {
  sessionId: string;
}

export default function ConsultationCall({ sessionId }: ConsultationCallProps) {
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "connected" | "ended"
  >("idle");
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [callTime, setCallTime] = useState(0);
  const [messages, setMessages] = useState<
    { sender: "user" | "assistant"; text: string }[]
  >([]);
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [role, setRole] = useState<"user" | "assistant">("assistant");
  const [liveTranscript, setLiveTranscript] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callStatus === "connected") {
      timer = setInterval(() => setCallTime((t) => t + 1), 1000);
    } else {
      setCallTime(0);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  const handleStartCall = () => {
    // 🚀 Create a new Vapi instance
    setVapiInstance(vapi);
    // 🔄 Set status to "connecting" while call initializes
    setCallStatus("connecting");
    // 📞 Start the Vapi voice call with the specific agent ID
    vapi.start(sessionId);
    // ✅ Triggered when the call successfully starts
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStatus("connected");
    });
    // 🛑 Triggered when the call ends
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStatus("ended");
      // 🚀 Redirect user or handle post-call logic here
      // ===== Navigate to the Dashboard =====
    });
    // 💬 Capture real-time transcribed messages from both user and assistant
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        console.log(`${message.role}: ${message.transcript}`);
        const { role, transcript, transcriptType } = message;
        if (transcriptType === "partial") {
          setRole(role);
          setLiveTranscript(transcript);
        } else {
          // setLiveTranscript('');
        }
        setMessages((prev) => [
          ...prev,
          {
            sender: message.role as "user" | "assistant",
            text: message.transcript,
          },
        ]);
      }
    });

    // 🎤 Triggered when the assistant starts speaking
    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setRole("assistant");
    });
    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setRole("user");
    });

    // ⚠️ Log any Vapi-related errors
    vapi.on("error", (err) => {
      console.error("Vapi error:", err);
    });
  };

  const handleEndCall = () => {
    endCall();
  };

  const endCall = () => {
    // 🛑 End the Vapi voice call
    if (vapiInstance) {
      vapiInstance.stop();
      setCallStatus("ended");
      // 🛑 Stop listening for events
      vapiInstance.off("call-start");
      vapiInstance.off("call-end");
      vapiInstance.off("message");
      // 🚀 Reset the Vapi instance
      setVapiInstance(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#f0fdfa] px-4 py-8 text-center relative overflow-hidden mt-20 rounded-2xl">
      {/* Animated Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute w-[300px] h-[300px] bg-[#019c6f] rounded-full blur-3xl z-0"
      />

      <div className="z-10 space-y-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="relative">
            <Image
              src="/consultant-1.png"
              alt="AI Consultant"
              width={130}
              height={130}
              className="rounded-full shadow-lg border-4 border-[#019c6f] mx-auto"
            />
            {callStatus === "connecting" && (
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="absolute inset-0 rounded-full border-4 border-[#019c6f] opacity-50"
              />
            )}
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">Dr. AIDoc</h2>
          <p className="text-sm text-gray-500">General Physician</p>

          {callStatus === "idle" && (
            <p className="text-gray-500 text-sm">
              Ready to start your consultation.
            </p>
          )}

          {callStatus === "connecting" && (
            <p className="text-[#019c6f] font-medium text-sm">Connecting...</p>
          )}

          {callStatus === "connected" && (
            <p className="text-[#019c6f] font-semibold text-sm">
              Call in progress – {formatTime(callTime)}
            </p>
          )}

          {callStatus === "ended" && (
            <p className="text-red-500 font-semibold text-sm">Call Ended</p>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {callStatus === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Button
                onClick={handleStartCall}
                className="bg-[#019c6f] hover:bg-[#017a59] text-white px-6 py-3 rounded-full text-lg"
              >
                <PhoneCall className="mr-2" /> Start Call
              </Button>
            </motion.div>
          )}

          {callStatus === "connected" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-6 justify-center mt-4"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMuted((prev) => !prev)}
                className="rounded-full w-14 h-14"
              >
                {muted ? <MicOff className="text-red-500" /> : <Mic />}
              </Button>

              <Button
                size="icon"
                onClick={handleEndCall}
                className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600 text-white shadow-lg"
              >
                <PhoneOff />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSpeakerOn((prev) => !prev)}
                className="rounded-full w-14 h-14"
              >
                {speakerOn ? (
                  <Volume2 />
                ) : (
                  <VolumeX className="text-gray-400" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {messages.length > 0 && (
          <div className="max-h-64 overflow-y-auto bg-white p-4 rounded-xl shadow mt-6 text-left space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Conversation
            </h3>
            {/* Display live transcript */}
            <div
              className={`inline-block px-4 py-2 rounded-xl shadow-sm text-sm max-w-xs capitalize ${
                role === "user"
                  ? "bg-[#e6faf5] text-[#0f172a] self-end"
                  : "bg-[#f1f5f9] text-gray-800 self-start"
              }`}
            >
              <p className="mb-1 text-xs font-medium text-[#019c6f] capitalize">
                {role === "user" ? "You" : "Dr. AIDoc"}
              </p>
              <p className="leading-snug">{liveTranscript}</p>
            </div>

            {/* {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-[#e6faf5] text-[#0f172a] self-end"
                    : "bg-gray-100 text-gray-700 self-start"
                }`}
              >
                <strong className="block text-xs mb-1">
                  {msg.sender === "user" ? "You" : "Dr. AIDoc"}
                </strong>
                {msg.text}
              </div>
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
}
