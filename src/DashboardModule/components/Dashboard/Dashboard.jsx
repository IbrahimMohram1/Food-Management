import React from "react";
import Header from "../../../Shared/components/Header/Header";
import HeaderImage from "../../../assets/images/DashBaordImage.png";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();
  return (
    <>
      <Header
        imageSize={"w-75"}
        spanText={"Welcome"}
        title={"Ibrahim"}
        imgUrl={HeaderImage}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="home-details  bg-light mt-3 rounded-3">
        <div className="p-5  d-flex justify-content-between align-items-center ">
          <div className="caption">
            <h4>
              Fill the <span className="fw-bold">Recipes</span> !
            </h4>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className="btn py-3 px-4 background-main text-white"
            >
              Fill Recipes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
