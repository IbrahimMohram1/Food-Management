import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../../axiosClient";
import { useAuthStore } from "../../../store/authStore";

export default function ForgetPassword() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });
  let navigate = useNavigate();
  const forgetPass = useAuthStore((store) => store.ForgetUserPassword);
  const onSubmit = (data) => {
    forgetPass(data, toast, navigate);
  };
  return (
    <>
      <div className="form-container">
        <div className="title">
          <h4>Forgot Your Password?</h4>
          <p className="text-muted">
            No worries! Please enter your email and we will send a password
            reset link{" "}
          </p>
        </div>

        <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <span className="input-group-text bg-white" id="basic-addon1">
              {" "}
              <i className="fa fa-envelope text-muted" aria-hidden="true"></i>
            </span>
            <input
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Please Enter a Valid Mail",
                },
              })}
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.email && (
            <div className="alert alert-danger p-2">{errors.email.message}</div>
          )}
          <button className="background-main btn w-100 text-white">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
