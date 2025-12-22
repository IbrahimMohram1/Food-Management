import React from "react";
import { useAuthStore } from "../../../store/authStore";

export default function SubHeader({
  title,
  description,
  buttonTitle,
  showButton,
  OnClick,
}) {
  let { user } = useAuthStore();

  return (
    <>
      <div className="  d-flex justify-content-between align-items-center   my-3 ">
        <div>
          <h6 className="fs-5 p-0 ">{title}</h6>
          <p className="p-0 text-muted">{description}</p>
        </div>
        <div>
          {showButton && user.userGroup === "SuperAdmin" && (
            <button
              onClick={OnClick}
              className="btn py-2 px-4 background-main text-white"
            >
              {buttonTitle}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
