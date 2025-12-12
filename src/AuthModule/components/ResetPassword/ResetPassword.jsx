import axios from "axios";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useToggle from "../../../Hooks/useToggle";
import { useAuthStore } from "../../../store/authStore";
import {
  emailRules,
  passwordRules,
  otpRules,
  confirmPasswordRules,
} from "../../../Utils/ValidationRules";
export default function ResetPassword() {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);
  let {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });
  const password = useWatch({ control, name: "password" });

  let navigate = useNavigate();
  const resetPass = useAuthStore((state) => state.ResetUserPassword);

  const onSubmit = (data) => {
    resetPass(data, toast, navigate);
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
              {...register("email", emailRules)}
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
          <div className="input-group mb-3">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-asterisk text-muted"></i>
            </span>
            <input
              type="text"
              {...register("seed", otpRules)}
              className="form-control"
              placeholder="OTP"
              aria-label="code"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.seed && (
            <div className="alert alert-danger p-2">{errors.seed.message}</div>
          )}
          <div className="input-group mb-3 position-relative">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-lock text-muted"></i>
            </span>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password", passwordRules)}
              className="form-control pe-5"
              placeholder="Ibrahim@123"
            />
            {/* --------------------- */}
            <i
              className={`${
                showPassword ? "fa fa-eye-slash" : "fa fa-eye"
              } eye-position`}
              onClick={toggleShowPassword}
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
              type={showConfirmPassword ? "text" : "password"}
              className="form-control pe-5"
              placeholder="Confirm Password"
              {...register("confirmPassword", confirmPasswordRules(password))}
              onChange={(e) => {
                register("confirmPassword").onChange(e);
                trigger("confirmPassword");
              }}
            />
            {/* --------------------- */}
            <i
              className={`${
                showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"
              } eye-position`}
              onClick={toggleShowConfirmPassword}
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
