import React from "react";

import Navbar from "@/components/navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="mx-auto w-full">{children}</div>
    </main>
  );
};

export default Layout;
