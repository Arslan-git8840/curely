import React from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Button }  from "@/components/ui/button"

export default function ConsultantDemo() {
  return (
    <section className="bg-gradient-to-br from-[#e0f7f4] to-[#ccf1ee] sm:py-10 py-6 px-3 md:px-12 rounded-2xl mt-24">
      {/* Section Heading */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span className="inline-block text-xs bg-[#d1fae5] text-[#047857] px-3 py-1 rounded-full font-medium mb-2">
          New Feature
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
          Meet Your Personalized AI Medical Consultant
        </h2>
        <p className="text-[#475569] text-sm md:text-base">
          Create your own virtual doctor tailored to your health needs. Whether it’s chronic care, mental wellness, or lifestyle tracking—your AI consultant is here for you, 24/7.
        </p>
      </div>

      {/* Card & Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: AI Consultant Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md mx-auto border border-gray-100">
          <div className="flex items-center gap-4">
            <Image
              src="/ai-doctor.png"
              alt="AI Doctor"
              width={64}
              height={64}
              className="rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#014d40]">
                Dr. Curely AI
              </h2>
              <p className="text-sm text-gray-500">Virtual Medical Consultant</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-[#0f172a]">
              <span className="font-medium">Purpose:</span>
              <span className="text-right">Diabetes & Nutrition</span>
            </div>
            <div className="flex justify-between text-[#0f172a]">
              <span className="font-medium">Specialty:</span>
              <span className="text-right">Endocrinology</span>
            </div>
            <div className="flex justify-between text-[#0f172a]">
              <span className="font-medium">Status:</span>
              <span className="text-green-600 flex items-center gap-1">
                <CircleCheck size={16} /> Online
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button className="bg-[#019c6f] hover:bg-[#017a59] text-white px-5 py-2 rounded-full text-sm">
              Open Consultant
            </Button>
          </div>
        </div>

        {/* Right: Form Image */}
        <div className="relative">
          <Image
            src="/form.webp" // Your uploaded form image
            alt="Form Example"
            width={600}
            height={700}
            className="rounded-3xl shadow-xl border border-gray-200"
          />
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-[#019c6f] text-white text-xs px-3 py-1 rounded-full shadow">
            Preview Form
          </div>
        </div>
      </div>
    </section>
  );
}
