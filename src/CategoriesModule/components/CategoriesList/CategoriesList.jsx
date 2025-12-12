import React from "react";
import { useCategoryStore } from "../../../store/categoryStore";
import { useEffect } from "react";
import Header from "../../../Shared/components/Header/Header";
import HeaderImage from "../../../assets/images/RecipesImage.png";
import SubHeader from "../../../Shared/components/SubHeader/SubHeader";
import NoData from "../../../Shared/components/NoData/NoData";

export default function CategoriesList() {
  let { fetchCategories, categories } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div>
        <Header
          imageSize={"w-50"}
          title={"Items"}
          spanText={"Categories"}
          imgUrl={HeaderImage}
          description={
            "You can now add your items that any user can order it from the Application and you can edit"
          }
        />{" "}
        <SubHeader
          title={"Categories Table Details"}
          description={"You can check all details"}
          buttonTitle={"Add New Category"}
        />
        <div className="table-container p-3">
          <div className="">
            {categories.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>CategoryName</th>
                    <th>Category Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.name}</td>
                      <td>{category.creationDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
