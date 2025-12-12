import React, { useEffect } from "react";
import { useRecipes } from "../../../Hooks/useRecipes";
import { useRecipesStore } from "../../../store/recipesStore";
import Header from "../../../Shared/components/Header/Header";
import HeaderImage from "../../../assets/images/RecipesImage.png";
import SubHeader from "../../../Shared/components/SubHeader/SubHeader";
import NoData from "../../../Shared/components/NoData/NoData";

export default function RecipesList() {
  const { recipes, loading, error, fetchRecipes } = useRecipesStore();
  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <div>
      <Header
        imageSize={"w-50"}
        title={"Items"}
        spanText={"Recipes"}
        imgUrl={HeaderImage}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <SubHeader
        title={"Recipe Table Details"}
        description={"You can check all details"}
        buttonTitle={"Add New Item"}
      />

      <div className="table-container p-3">
        <div className="">
          {recipes.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ItemName</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>tag</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{recipe.name}</td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>

                    <td>{recipe.tag.name}</td>
                    <td>{recipe.category[0].name}</td>
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
  );
}
