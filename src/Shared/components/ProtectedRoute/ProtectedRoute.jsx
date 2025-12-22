import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  let { user } = useAuthStore();
  let role = user?.userGroup;

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return children;
}
