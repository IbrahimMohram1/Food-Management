import React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex vh-100">
        <div>
          <Sidebar />
        </div>
        <div className="w-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
