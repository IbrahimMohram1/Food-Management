import React from "react";
import { useCategoryStore } from "../../../store/categoryStore";
import { useEffect } from "react";
import Header from "../../../Shared/components/Header/Header";
import HeaderImage from "../../../assets/images/RecipesImage.png";
import SubHeader from "../../../Shared/components/SubHeader/SubHeader";
import NoData from "../../../Shared/components/NoData/NoData";
import ActionButtons from "../../../Shared/components/ActionButtons/ActionButtons";
import LoaderSpinner from "../../../Shared/components/LoaderSpinner/LoaderSpinner";

export default function CategoriesList() {
  let { fetchCategories, categories, loading } = useCategoryStore();
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
            {loading ? (
              <LoaderSpinner />
            ) : categories.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped overflow-scroll w-100">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>CategoryName</th>
                      <th>Category Creation Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{category.name}</td>
                        <td>
                          {new Date(category.creationDate).toLocaleDateString()}
                        </td>
                        <td>
                          <ActionButtons />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
