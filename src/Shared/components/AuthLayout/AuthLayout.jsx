import React from "react";
import { Outlet } from "react-router-dom";
import AuthLogo from "../../../assets/images/AuthIcon.png";

export default function AuthLayout() {
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay ">
          <div className="row vh-100 justify-content-center align-items-center ">
            <div className="col-lg-6 col-md-8 bg-white p-5 rounded-3">
              <div className="logo-container text-center">
                <img
                  className="w-50 text-center"
                  src={AuthLogo}
                  alt="AuthLogo"
                />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
