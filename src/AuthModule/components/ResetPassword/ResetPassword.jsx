import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  let {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onBlur",
  });
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data,
      );
      console.log(response);
      navigate("/login");

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
              <i class="fa fa-envelope text-muted" aria-hidden="true"></i>
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
          <div className="input-group mb-3">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-asterisk text-muted"></i>
            </span>
            <input
              type="text"
              {...register("seed", {
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
          <div className="input-group mb-3 position-relative">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-lock text-muted"></i>
            </span>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is Required",
                pattern: {
                  value: /^[A-Z][a-zA-Z\d@#$%^&*!]{5,}$/,
                  message:
                    "Password must start with a capital letter and contain letters, numbers, and a special character",
                },
              })}
              className="form-control pe-5"
              placeholder="Ibrahim@123"
            />

            {/* 👁️ أيكونة الإظهار/الإخفاء — هنا مش جوه span */}
            <i
              className={`${
                showPassword ? "fa fa-eye-slash" : "fa fa-eye"
              } eye-position`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          {errors.password && (
            <div className="alert alert-danger p-2">
              {errors.password.message}
            </div>
          )}
          <div className=" input-group mb-3 position-relative">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-lock text-muted"></i>
            </span>
            <input
              type={showConfirm ? "text" : "password"}
              className="form-control pe-5"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is Required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              onChange={(e) => {
                register("confirmPassword").onChange(e);
                trigger("confirmPassword");
              }}
            />

            {/* Eye Icon */}
            <i
              className={`${
                showConfirm ? "fa fa-eye-slash" : "fa fa-eye"
              } eye-position`}
              onClick={() => setShowConfirm(!showConfirm)}
            ></i>
          </div>

          {errors.confirmPassword && (
            <div className="alert alert-danger p-2">
              {errors.confirmPassword.message}
            </div>
          )}

          <button className="background-main btn w-100 text-white">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}
