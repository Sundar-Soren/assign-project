import React from "react";
import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";

const MyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <main className=" px-5 md:pl-64 pt-28 pb-2">{children}</main>
    </div>
  );
};

export default MyLayout;
