import React from "react";
import { Poppins } from "next/font/google";
import { isAuthenticated } from "@/firebase/actions";
import { redirect } from "next/navigation";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isAuth = await isAuthenticated();
    console.log(isAuth);
    if(isAuth) redirect('/');
    
  return ( 
  <div className={`${poppins.className}`}>
    {children}
    </div>
  )
}
