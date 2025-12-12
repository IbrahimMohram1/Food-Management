import React from "react";

export default function SubHeader({ title, description, buttonTitle }) {
  return (
    <>
      <div className="  d-flex justify-content-between align-items-center   my-3 ">
        <div>
          <h6 className="fs-5 p-0 ">{title}</h6>
          <p className="p-0 text-muted">{description}</p>
        </div>
        <div>
          <button className="btn py-2 px-4 background-main text-white">
            {buttonTitle}
          </button>{" "}
        </div>
      </div>
    </>
  );
}
