import React from "react";
import { RingLoader } from "react-spinners";

export default function LoaderSpinner() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100">
        <RingLoader color="#4AA35A" size={60} />
      </div>
    </>
  );
}
