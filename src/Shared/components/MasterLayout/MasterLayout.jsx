import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import AppSideBar from "../AppSideBar/AppSideBar.jsx";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex vh-100">
        <div className="vh-100  ">
          <AppSideBar />
        </div>
        <div className="w-100 mx-5">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
