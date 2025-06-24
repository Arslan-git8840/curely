
import React from "react";
import { Poppins } from "next/font/google";
import Nav from "@/components/Nav";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( 
  <div className={`${poppins.className}`}>
    <main className="min-h-screen bg-[#f9fafc] text-gray-800 px-4 py-3 md:px-12 lg:px-24">
      <Nav />
    {children}
    </main>
    </div>
  )
}
