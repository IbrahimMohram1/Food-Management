import axios from "axios";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useToggle from "../../../Hooks/useToggle";
import { useAuthStore } from "../../../store/authStore";
import {
  userNameRules,
  emailRules,
  passwordRules,
  countryRules,
  phoneRules,
  confirmPasswordRules,
} from "../../../Utils/ValidationRules";
export default function Register() {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);

  let {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });
  const password = useWatch({ control, name: "password" });

  let navigate = useNavigate();
  let { RegisterUser, loading } = useAuthStore();

  const onSubmit = (data) => {
    RegisterUser(data, toast, navigate);
  };
  return (
    <>
      <div className="form-container">
        <div className="title">
          <h4>Register</h4>
          <p className="text-muted">Welcome Back! Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <span className="input-group-text bg-white" id="basic-addon1">
                  <i
                    className="fa fa-envelope text-muted"
                    aria-hidden="true"
                  ></i>
                </span>
                <input
                  type="text"
                  {...register("userName", userNameRules)}
                  className="form-control"
                  placeholder="Enter Your Name"
                  aria-label="userName "
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.userName && (
                <div className="alert alert-danger p-2">
                  {errors.userName.message}
                </div>
              )}

              <div className="input-group mb-3">
                <span className="input-group-text bg-white" id="basic-addon1">
                  <i className="fa-solid fa-earth-africa text-muted"></i>
                </span>
                <input
                  type="text"
                  {...register("country", countryRules)}
                  className="form-control"
                  placeholder="Country"
                  aria-label="country"
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.country && (
                <div className="alert alert-danger p-2">
                  {errors.country.message}
                </div>
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

                <i
                  className={`fa ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } eye-position`}
                  onClick={toggleShowPassword}
                ></i>
              </div>

              {errors.password && (
                <div className="alert alert-danger p-2">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <span className="input-group-text bg-white" id="basic-addon1">
                  <i
                    className="fa fa-envelope text-muted"
                    aria-hidden="true"
                  ></i>
                </span>
                <input
                  type="email"
                  {...register("email", emailRules)}
                  className="form-control"
                  placeholder="Enter Your Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.email && (
                <div className="alert alert-danger p-2">
                  {errors.email.message}
                </div>
              )}

              <div className="input-group mb-3">
                <span className="input-group-text bg-white" id="basic-addon1">
                  <i className="fa-solid fa-mobile text-muted"></i>
                </span>
                <input
                  type="tel"
                  {...register("phoneNumber", phoneRules)}
                  className="form-control"
                  placeholder="PhoneNumber "
                  aria-label="phoneNumber  "
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.phoneNumber && (
                <div className="alert alert-danger p-2">
                  {errors.phoneNumber.message}
                </div>
              )}

              <div className="mb-3 position-relative input-group">
                <span className="input-group-text bg-white" id="basic-addon1">
                  <i className="fa-solid fa-lock text-muted"></i>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control pe-5"
                  placeholder="Confirm Password"
                  {...register(
                    "confirmPassword",
                    confirmPasswordRules(password),
                  )}
                  onChange={(e) => {
                    register("confirmPassword").onChange(e);
                    trigger("confirmPassword");
                  }}
                />

                <i
                  className={`fa ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  } eye-position`}
                  onClick={toggleShowConfirmPassword}
                ></i>
              </div>

              {errors.confirmPassword && (
                <div className="alert alert-danger p-2">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>
          <div className="links d-flex justify-content-end my-3">
            <Link className="text-main text-decoration-none" to="/login">
              Login Now?
            </Link>
          </div>
          <button
            className="background-main btn w-100 text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
