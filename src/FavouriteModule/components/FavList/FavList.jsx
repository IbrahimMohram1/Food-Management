import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import SubHeader from "../../../Shared/components/SubHeader/SubHeader";
import HeaderImage from "../../../assets/images/RecipesImage.png";
import { useRecipesStore } from "../../../store/recipesStore";
import NoData from "../../../Shared/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function FavList() {
  let BaseUrl = "https://upskilling-egypt.com:3006/";
  let { deleteFav, getFavs, favRecipes } = useRecipesStore();
  useEffect(() => {
    getFavs();
  }, []);
  const [show, setShow] = useState(false);
  const [selectedFav, setSelectedFav] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedFav(null);
  };
  const handleShow = (fav) => {
    setSelectedFav(fav);
    setShow(true);
  };
  const handleConfirmDelete = async () => {
    {
      deleteFav(selectedFav.id);
      handleClose();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFav && (
            <p>
              Are you sure you want to remove{" "}
              <strong>{selectedFav?.recipe?.name}</strong> from your favorites?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Header
        imageSize={"w-50"}
        title={"List"}
        spanText={"Fav"}
        imgUrl={HeaderImage}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <SubHeader
        title={"Favs Table Details"}
        description={"You can check all details"}
        showButton={false}
      />
      {favRecipes?.data?.length > 0 ? (
        <div className="container">
          <div className="row">
            {favRecipes?.data.map((fav) => (
              <div className="col-md-3" key={fav.id}>
                <div className="card h-100">
                  <div
                    className="card-img-container"
                    style={{ height: "250px", overflow: "hidden" }}
                  >
                    <img
                      style={{ minWidth: "fit-content" }}
                      className="card-img-top  h-100 object-fit-cover min-w"
                      src={`${BaseUrl}${fav.recipe.imagePath}`}
                      alt={fav.recipe.name}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{fav.recipe.name}</h5>
                      <div
                        onClick={() => handleShow(fav)}
                        className="cursor-pointer"
                      >
                        <i className="fa-solid fa-heart fs-5 text-danger"></i>{" "}
                      </div>
                    </div>

                    <p className="card-text flex-grow-1">
                      {fav.recipe.description}
                    </p>
                    <p className="card-text flex-grow-1">
                      {new Date(fav.recipe.creationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
