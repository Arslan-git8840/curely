"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { HeartPulse, Menu, X } from "lucide-react";
import { MdOutlineArrowOutward } from "react-icons/md";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-3 py-2 md:px-4 relative">
      {/* Logo */}
      {/* <div className="text-xl font-bold text-[#014d40] flex items-center gap-2">
        <Image src="/ai-doctor.png" alt="Carely Logo" width={28} height={28} />
        Curely
      </div> */}
      <div className="flex items-center gap-2 text-[#014d40] text-2xl font-bold">
        <HeartPulse size={24} /> Curely
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 items-center">
        <nav className="flex gap-6 text-sm font-medium">
          {[
            "Dashboard",
            "Wellness Reports",
            "My Consultants",
          ].map((item) => (
            <Link
              href="#"
              key={item}
              className="text-[#0f172a] hover:text-[#019c6f] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
        <Button className="bg-[#019c6f] hover:bg-[#017a59] text-white rounded-full px-5 py-2 text-sm flex items-center gap-2">
          Get in Touch <MdOutlineArrowOutward size={16} className="mb-1 mr-1" />
        </Button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="text-[#014d40]" />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="text-xl font-bold text-[#014d40]">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X />
          </Button>
        </div>
        <nav className="flex flex-col gap-4 p-4 text-sm font-medium">
          {[
            "Dashboard",
            "Wellness Reports",
            "My Consultants",
            "About Curely",
          ].map((item) => (
            <Link
              href="#"
              key={item}
              className="text-[#0f172a] hover:text-[#019c6f] transition-colors"
              onClick={() => setIsOpen(false)} // close on click
            >
              {item}
            </Link>
          ))}
          <Button className="mt-4 bg-[#019c6f] hover:bg-[#017a59] text-white rounded-full px-5 py-2 text-sm flex items-center gap-2 w-full justify-center">
            Get in Touch{" "}
            <MdOutlineArrowOutward size={16} className="mb-1 mr-1" />
          </Button>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Nav;
