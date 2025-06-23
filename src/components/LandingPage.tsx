import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Nav from "./Nav";
import ConsultantDemo from "./ConsultantDemoCard";
import ReportSection from "./ReportDemoSection";
import Footer from "./FooterSection";

export default function CarelyLandingPage() {
  return (
    <div
      className={`min-h-screen bg-[#f9fafc] text-gray-800 px-4 py-6 md:px-12 lg:px-24 `}
    >
      {/* Header */}
      <Nav />
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-12">
        {/* Left content */}
        <div>
          <div className="border-2 border-[#019c6f] text-[#019c6f] text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 mb-4 font-medium">
            <Image src="/secure.png" alt="secure icon" width={16} height={16} />
            100% <span className="text-black">Health Guaranteed</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-[#0f172a]">
            Transforming the Future of Healthcare with{" "}
            <span className="text-[#019c6f]">Curely</span>
          </h1>
          <p className="text-[#475569] mt-4 mb-6 max-w-lg">
            Book appointments, track your wellness, and stay connected with
            expert care — all in one app.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#019c6f] hover:bg-[#017a59] text-white px-6 py-2 rounded-full text-sm">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-[#cbd5e1] text-[#0f172a] px-6 py-2 rounded-full text-sm"
            >
              Watch Demo
            </Button>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2 mt-6">
            <div className="flex text-yellow-400 text-sm">★★★★★</div>
            <p className="text-sm text-[#475569]">
              Rated <span className="text-[#019c6f] font-semibold">4.9/5</span>{" "}
              From over 950 reviews
            </p>
            <Image
              src="/ai-doctor.png"
              alt="Google Logo"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Right content */}
        <div className="relative">
          <img
            src="/doctors.png"
            alt="Doctors Illustration"
            width={600}
            height={400}
            className="w-full h-auto"
          />
          <div className="w-64 absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg px-5 py-3 rounded-full flex items-center gap-3 text-sm">
            <img
              src="/ai-doctor.png"
              alt="Emergency Icon"
              width={24}
              height={24}
              className="rounded-full border border-gray-200"
            />
            <div className="leading-tight">
              <p className="text-[#0f172a] font-semibold">Emergency Call</p>
              <p className="text-gray-500 text-xs">24/7 Available For Help</p>
            </div>
          </div>
        </div>
      </section>
      {/* Consultant AI Demo */}
      <section className="px-0 md:px-12 lg:px-24 mt-12">
        <ConsultantDemo />
      </section>

      {/* AI Report Section */}
      <section className="px-0 md:px-12 lg:px-24 mt-10">
        <ReportSection />
      </section>

      {/*  Footer Section */}
      <section className="px-1 md:px-12 lg:px-24 mt-10 pb-6">
        <Footer />
      </section>

    </div>
  );
}
