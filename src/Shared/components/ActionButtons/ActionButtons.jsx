import React, { useState } from "react";
import { useRecipesStore } from "../../../store/recipesStore";
import { useAuthStore } from "../../../store/authStore";

export default function ActionButtons({ onUpdate, onDelete, onFav }) {
  const { recipes } = useRecipesStore();
  let { user } = useAuthStore();
  return (
    <>
      <div className="dropdown">
        <li
          className="w-fit"
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
          {user.userGroup === "SystemUser" && (
            <li className="dropdown-item">
              <div onClick={onFav}>
                <i className="fa-regular fa-heart text-danger fs-6 "></i>
                <span className="mx-2">Add To Fav</span>
              </div>
            </li>
          )}
          {user.userGroup === "SuperAdmin" && (
            <li className="dropdown-item">
              <div onClick={onUpdate}>
                <i className="fa-regular fa-pen-to-square text-main fs-6 "></i>
                <span className="mx-2">Edit</span>
              </div>
            </li>
          )}
          {user.userGroup === "SuperAdmin" && (
            <li className="dropdown-item">
              <div onClick={onDelete}>
                <i className=" text-danger fa-solid fa-trash"></i>{" "}
                <span className="mx-2">Delete</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
