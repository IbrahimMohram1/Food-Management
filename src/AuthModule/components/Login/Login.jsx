import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../../axiosClient";

export default function Login() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axiosClient.post("/Users/Login", data);
      toast.success("Login is Success");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="form-container">
      <div className="title">
        <h4>Log In</h4>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text bg-white" id="basic-addon1">
            <i className="fa fa-envelope text-muted" aria-hidden="true"></i>
          </span>
          <input
            type="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Please Enter a Valid Mail",
              },
            })}
            className="form-control"
            placeholder="Enter Your Email"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <div className="alert alert-danger p-2">{errors.email.message}</div>
        )}
        <div className="input-group mb-3">
          <span className="input-group-text bg-white" id="basic-addon1">
            <i className="fa-solid fa-lock text-muted"></i>
          </span>
          <input
            type="password"
            {...register("password", {
              required: "Password is Required",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{5,}$/,
                message:
                  "Password must start with a capital letter and contain letters, numbers, and a special character",
              },
            })}
            className="form-control"
            placeholder=" Ibrahim@123"
            aria-label="password"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.password && (
          <div className="alert alert-danger p-2">
            {errors.password.message}
          </div>
        )}
        <div className="links d-flex justify-content-between my-3">
          <Link className="text-black text-decoration-none" to="/register">
            Register Now?
          </Link>
          <Link className=" text-decoration-none text-main" to="/forget-pass">
            Forget Password?
          </Link>
        </div>

        <button className="background-main btn w-100 text-white">Login</button>
      </form>
    </div>
  );
}
