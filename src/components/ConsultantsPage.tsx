"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ConsultantForm } from "./CreateConsultantForm";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const dummyConsultants = [
  {
    id: 1,
    name: "Dr. Maya Rao",
    specialty: "Cardiologist",
    description:
      "Experienced in managing complex heart conditions and preventive cardiac care.",
    avatar: "/consultant-1.png",
  },
  {
    id: 2,
    name: "Dr. Arjun Sen",
    specialty: "Endocrinologist",
    description:
      "Specializes in diabetes, hormonal imbalances, and thyroid disorders.",
    avatar: "/consultant-2.png",
  },
  {
    id: 3,
    name: "Dr. Neha Kapoor",
    specialty: "Dermatologist",
    description:
      "Expert in treating chronic skin conditions and aesthetic dermatology.",
    avatar: "/consultant-3.png",
  },
];

export default function Consultants() {
  return (
    <section className="min-h-screen px-2 md:px-12 py-10 bg-[#f9fafc]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#0f172a] mb-1">
            My AI Consultants
          </h1>
          <p className="text-sm text-[#475569]">
            Meet your virtual care experts powered by Curely AI.
          </p>
        </div>

        {/* Button opens Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#019c6f] hover:bg-[#017a59] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 self-start sm:self-auto">
              <PlusCircle size={18} /> Create New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-[#0f172a]">
                Add New Consultant
              </DialogTitle>
            </DialogHeader>
            <ConsultantForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Consultant Cards */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {dummyConsultants.map((consultant) => (
          <motion.div
            key={consultant.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center"
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Image
              src={consultant.avatar}
              alt={consultant.name}
              width={90}
              height={90}
              className="rounded-full border mb-4 shadow-sm"
            />
            <h3 className="font-semibold text-[#0f172a] text-lg mb-1">
              {consultant.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs bg-[#e6faf5] text-[#019c6f] px-3 py-1 rounded-full mb-2">
              <Stethoscope size={14} /> {consultant.specialty}
            </span>
            <p className="text-sm text-[#475569] leading-relaxed">
              {consultant.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
