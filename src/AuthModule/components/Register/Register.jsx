import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  let {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        data,
      );
      console.log(data);

      toast.success("Register is Success");
      navigate("/verify-account");
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
                  {...register("userName", {
                    required: "UserName is Required",
                    maxLength: {
                      value: 8,
                      message: "Maximum length is 8",
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{1,8}$/,
                      message: "Please Enter a Char with number max is 8",
                    },
                  })}
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
                  {...register("country", {
                    required: "Country is Required",
                    minLength: {
                      value: 3,
                      message: "min length is 3",
                    },
                  })}
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

              <div className="input-group mb-3">
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
                  className="form-control"
                  placeholder="Ibrahim@123"
                />
                <span
                  className="input-group-text bg-white"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                  ></i>
                </span>
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
                  type="text"
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
                  {...register("phoneNumber", {
                    required: "PhoneNumber is Required",
                    pattern: {
                      value: /^(?:\+20)?01[0-9]{9}$/,
                      message: "Please enter a valid Phone Number",
                    },
                  })}
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

              <div className="input-group mb-3">
                <span className="input-group-text bg-white" id="basic-addon1">
                  <i className="fa-solid fa-lock text-muted"></i>
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is Required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className="form-control"
                  placeholder="Confirm Password"
                />
                <span
                  className="input-group-text bg-white"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={
                      showConfirm ? "fa fa-eye-slash border-0" : "fa fa-eye"
                    }
                  ></i>
                </span>
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

          <button className="background-main btn w-100 text-white ">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
