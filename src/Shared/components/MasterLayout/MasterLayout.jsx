import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import AppSideBar from "../AppSideBar/AppSideBar.jsx";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex ">
        <div className=" sideBar ">
          <AppSideBar />
        </div>
        <div className="  w-100   ps-3 overflow-x-hidden">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
