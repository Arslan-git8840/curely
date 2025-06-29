
import React from "react";
import { Poppins } from "next/font/google";
import Nav from "@/components/Nav";
import { isAuthenticated } from "@/firebase/actions";
import { redirect } from "next/navigation";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isAuth = await isAuthenticated();
  console.log(isAuth);
  if(!isAuth) redirect('/auth/log-in');
  
  return ( 
  <div className={`${poppins.className}`}>
    <main className="min-h-screen bg-[#f9fafc] text-gray-800 px-4 py-3 md:px-12 lg:px-24">
      <Nav />
    {children}
    </main>
    </div>
  )
}
