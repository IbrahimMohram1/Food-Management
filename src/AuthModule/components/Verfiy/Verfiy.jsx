import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Verfiy() {
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
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data,
      );
      toast.success("Verify is Success");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
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
              type="text"
              {...register("code", {
                required: "OTP is Required",
                minLength: {
                  value: 3,
                  message: "Enter a Valid OTP Code",
                },
              })}
              className="form-control"
              placeholder="OTP"
              aria-label="code"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.code && (
            <div className="alert alert-danger p-2">{errors.code.message}</div>
          )}

          <button className="background-main btn w-100 text-white">Send</button>
        </form>
      </div>
    </>
  );
}
