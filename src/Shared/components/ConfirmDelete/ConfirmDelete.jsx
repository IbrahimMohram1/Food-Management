import React from "react";
import imgUrl from "../../../assets/images/NoDataImage.png";

export default function ConfirmDelete({ Item }) {
  return (
    <>
      <div className=" text-center ">
        <img src={imgUrl} />
        <div className="my-3">
          <h4>Delete This {Item} ?</h4>
          <span>
            Are you sure you want to delete this item? If you are sure, just
            click
          </span>
        </div>
      </div>
    </>
  );
}
