import React, { useState } from "react";
import { useRecipesStore } from "../../../store/recipesStore";

export default function ActionButtons({ onUpdate, onDelete }) {
  const { recipes } = useRecipesStore();

  return (
    <>
      <div className="dropdown">
        <li
          className="  "
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-ellipsis"></i>
        </li>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li className="dropdown-item">
            <div>
              <i className="fa-regular fa-eye text-main"></i>
              <span className="mx-2">View</span>
            </div>
          </li>
          <li className="dropdown-item">
            <div onClick={onUpdate}>
              <i className="fa-regular fa-pen-to-square text-main fs-6 "></i>
              <span className="mx-2">Edit</span>
            </div>
          </li>
          <li className="dropdown-item">
            <div onClick={onDelete}>
              <i className=" text-danger fa-solid fa-trash"></i>{" "}
              <span className="mx-2">Delete</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
