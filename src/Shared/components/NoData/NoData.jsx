import React from "react";
import imgUrl from "../../../assets/images/NoDataImage.png";
export default function NoData() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={imgUrl} alt="No Data" />
        <div className="mt-3 text-center">
          <h6 className="fs-6">No Data !</h6>
          <p className="text-muted  text-wrap">
            Are you sure you want to delete this item? If you are sure, just{" "}
            <br />
            click on delete it.
          </p>
        </div>
      </div>
    </>
  );
}
