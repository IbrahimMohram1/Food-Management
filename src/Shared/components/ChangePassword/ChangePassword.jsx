import React from "react";
import useToggle from "../../../Hooks/useToggle";
import { useForm, useWatch } from "react-hook-form";
import { useAuthStore } from "../../../store/authStore";
import {
  emailRules,
  passwordRules,
  confirmPasswordRules,
} from "../../../Utils/ValidationRules";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);
  let navigate = useNavigate();
  let { changePass, loading } = useAuthStore();

  let {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const password = useWatch({ control, name: "newPassword" });
  const onSubmit = (data) => {
    changePass(data, navigate);
  };
  return (
    <>
      <div className="w-75 mx-auto d-flex justify-content-center  h-75 flex-column">
        <div className="title">
          <h4>Change Password</h4>
          <p className="text-muted">
            Change Password! Please enter your details
          </p>
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-lock text-muted"></i>
            </span>
            <input
              type="password"
              {...register("oldPassword", passwordRules)}
              className="form-control"
              placeholder="Enter Your Old Password"
              aria-label="password"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.oldPassword && (
            <div className="alert alert-danger p-2">
              {errors.oldPassword.message}
            </div>
          )}
          <div className="input-group mb-3">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-lock text-muted"></i>
            </span>
            <input
              type="password"
              {...register("newPassword", passwordRules)}
              className="form-control"
              placeholder="Enter Your New Password"
              aria-label="newPassword"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.newPassword && (
            <div className="alert alert-danger p-2">
              {errors.newPassword.message}
            </div>
          )}
          <div className="mb-3 position-relative input-group">
            <span className="input-group-text bg-white" id="basic-addon1">
              <i className="fa-solid fa-lock text-muted"></i>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control pe-5"
              placeholder="Confirm Your New Password"
              {...register(
                "confirmNewPassword",
                confirmPasswordRules(password),
              )}
            />

            <i
              className={`fa ${
                showConfirmPassword ? "fa-eye-slash" : "fa-eye"
              } eye-position`}
              onClick={toggleShowConfirmPassword}
            ></i>
          </div>
          {errors.confirmNewPassword && (
            <div className="alert alert-danger p-2">
              {errors.confirmNewPassword.message}
            </div>
          )}
          <button
            className="background-main btn w-100 text-white"
            disabled={loading}
          >
            {" "}
            {loading ? "Loading..." : "Change Password"}{" "}
          </button>{" "}
        </form>
      </div>
    </>
  );
}
