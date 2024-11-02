import React from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "base-300",
            color: "base-100",
          },
        }}
      />
      <Navbar />
      <div className="mx-auto w-full bg-bg-100">{children}</div>
    </main>
  );
};

export default Layout;
