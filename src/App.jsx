import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./Shared/components/AuthLayout/AuthLayout";
import NotFound from "./Shared/components/NotFound/NotFound";
import Login from "./AuthModule/components/Login/Login";
import Register from "./AuthModule/components/Register/Register";
import ForgetPassword from "./AuthModule/components/ForgetPassword/ForgetPassword";
import ResetPassword from "./AuthModule/components/ResetPassword/ResetPassword";
import Verfiy from "./AuthModule/components/Verfiy/Verfiy";
import MasterLayout from "./Shared/components/MasterLayout/MasterLayout";
import Dashboard from "./DashboardModule/components/Dashboard/Dashboard";
import RecipesList from "./RecipeModule/components/RecipesList/RecipesList";
import RecipeData from "./RecipeModule/components/RecipeData/RecipeData";
import CategoriesList from "./CategoriesModule/components/CategoriesList/CategoriesList";
import CategoryData from "./CategoriesModule/components/CategoryData/CategoryData";
import UsersList from "./UsersModule/components/UsersList/UsersList";
import { Bounce, ToastContainer } from "react-toastify";
import ProtectedRoute from "./Shared/components/ProtectedRoute/ProtectedRoute";

function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: localStorage.getItem("access_token") ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPassword /> },
        { path: "reset-pass", element: <ResetPassword /> },
        { path: "verify-account", element: <Verfiy /> },
      ],
    },
    {
      path: "dashboard",

      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "category", element: <CategoryData /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {/* <h1>Hi , We're UpSkilling </h1> */}
    </>
  );
}

export default App;
