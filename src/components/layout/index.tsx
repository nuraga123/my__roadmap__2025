"use client"
import { useState } from "react";


import Navbar from "@/components/nav";

export default function MyRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [show, setShow] = useState(true);

  return (
    <div className="flex">

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <Navbar show={show} />
      </div>

      <main className="w-full min-h-screen bg-white">
        <button onClick={() => setShow(!show)} className={`sticky top-5 ml-5 left-10 bg-blue-500 text-white  px-4 py-2 rounded-full  font-extrabold mb-10 cursor-pointer 
    select-none transition-all duration-300 transform 
    hover:text-blue-700 hover:scale-105`}>
          {show ? "X" : "Menu"}
        </button>
        {children}
      </main>
    </div>
  );
}
