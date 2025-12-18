import React, { useEffect, useState } from "react";
import { useRecipes } from "../../../Hooks/useRecipes";
import { useRecipesStore } from "../../../store/recipesStore";
import Header from "../../../Shared/components/Header/Header";
import HeaderImage from "../../../assets/images/RecipesImage.png";
import SubHeader from "../../../Shared/components/SubHeader/SubHeader";
import NoData from "../../../Shared/components/NoData/NoData";
import ActionButtons from "../../../Shared/components/ActionButtons/ActionButtons";
import LoaderSpinner from "../../../Shared/components/LoaderSpinner/LoaderSpinner";
import { useAuthStore } from "../../../store/authStore";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ConfirmDelete from "../../../Shared/components/ConfirmDelete/ConfirmDelete";
export default function RecipesList() {
  const { recipes, loading, error, fetchRecipes, deleteRecipe } =
    useRecipesStore();
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedCategory(recipe);
    setShow(true);
  };
  const handleDelete = (id) => {
    deleteRecipe(id);
    setShow(false);
  };
  let BaseUrl = "https://upskilling-egypt.com:3006/";

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <div className="">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="customCloseBtn">
            <i
              className="fa-solid fa-xmark text-right fs-4 text-danger cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <ConfirmDelete
            Item={`Recipe ${selectedCategory?.name}`}
            category={selectedCategory}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => handleDelete(selectedCategory.id)}
          >
            Delete This Item
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="table-container p-3 overflow-x-auto">
        <div className="">
          {loading ? (
            <LoaderSpinner />
          ) : recipes.length > 0 ? (
            <div className="table-responsive vh-100">
              <table className="table table-striped  min-w-full ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Tag</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map((recipe, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{recipe.name}</td>
                      <td>
                        <img
                          className="TableimgStyle"
                          src={`${BaseUrl}${recipe.imagePath}`}
                          alt={recipe.name}
                        />
                      </td>
                      <td>{recipe.price}</td>
                      <td>{recipe.description}</td>
                      <td>{recipe.tag.name}</td>
                      <td>{recipe?.category[0]?.name}</td>
                      <td>
                        <ActionButtons onDelete={() => handleShow(recipe)} />
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
  );
}
