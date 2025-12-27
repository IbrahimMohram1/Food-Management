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
import { useNavigate } from "react-router-dom";
import Pagination from "../../../Shared/components/Pagination/Pagination";
export default function RecipesList() {
  const {
    recipes,
    loading,
    error,
    fetchRecipes,
    userAddToFav,
    deleteRecipe,
    pageNumber,
    totalNumberOfPages,
  } = useRecipesStore();
  const { user } = useAuthStore();
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [modalMode, setModalMode] = useState(""); // delete | fav
  const handleClose = () => {
    setShow(false);
    setModalMode("");
    setSelectedRecipe(null);
  };

  const handleDeleteShow = (recipe) => {
    setSelectedRecipe(recipe);
    setModalMode("delete");
    setShow(true);
  };

  const handleFavShow = (recipe) => {
    setSelectedRecipe(recipe);
    setModalMode("fav");
    setShow(true);
  };

  const handleDelete = () => {
    deleteRecipe(selectedRecipe.id);
    handleClose();
  };

  const handleAddToFav = () => {
    console.log("Add To Fav:", selectedRecipe.id);
    userAddToFav(selectedRecipe.id);
    handleClose();
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
        showButton={true}
        OnClick={() => navigate("/dashboard/recipe-data")}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="customCloseBtn">
            <i
              className="fa-solid fa-xmark fs-4 text-danger cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </Modal.Header>

        <Modal.Body>
          {modalMode === "delete" && (
            <ConfirmDelete
              Item={`Recipe ${selectedRecipe?.name}`}
              category={selectedRecipe}
            />
          )}

          {modalMode === "fav" && (
            <div>
              <div>
                <img
                  className="img-fluid"
                  src={`${BaseUrl}${selectedRecipe.imagePath}`}
                  alt={selectedRecipe.name}
                />{" "}
              </div>
              <p className="fw-bold text-center">
                Are you sure you want to add
                <span className="text-success"> {selectedRecipe?.name} </span>
                to your favorites?
              </p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          {modalMode === "delete" && (
            <Button variant="outline-danger" onClick={handleDelete}>
              Delete This Item
            </Button>
          )}

          {modalMode === "fav" && (
            <Button variant="outline-success" onClick={handleAddToFav}>
              Confirm Add To Favorite
            </Button>
          )}
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
                      <td>{(pageNumber - 1) * 10 + index + 1}</td>
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
                        <ActionButtons
                          onUpdate={() =>
                            navigate(`/dashboard/recipe-data/${recipe.id}`)
                          }
                          onDelete={() => handleDeleteShow(recipe)}
                          onFav={() => handleFavShow(recipe)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={pageNumber}
                totalPages={totalNumberOfPages}
                onPageChange={(page) => fetchRecipes(page)}
              />
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
}
