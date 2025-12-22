import React, { useState, useEffect } from "react";
import { useCategoryStore } from "../../../store/categoryStore";
import Header from "../../../Shared/components/Header/Header";
import HeaderImage from "../../../assets/images/RecipesImage.png";
import SubHeader from "../../../Shared/components/SubHeader/SubHeader";
import NoData from "../../../Shared/components/NoData/NoData";
import ActionButtons from "../../../Shared/components/ActionButtons/ActionButtons";
import LoaderSpinner from "../../../Shared/components/LoaderSpinner/LoaderSpinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import confirmImage from "../../../assets/images/NoDataImage.png";
import ConfirmDelete from "../../../Shared/components/ConfirmDelete/ConfirmDelete";
import Pagination from "../../../Shared/components/Pagination/Pagination";
export default function CategoriesList() {
  const {
    fetchCategories,
    categories,
    loading,
    deleteCategory,
    addCategory,
    updateCategory,
    totalNumberOfPages,
    pageNumber,
  } = useCategoryStore();

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("add"); // add | update | delete
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const isAdd = mode === "add";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isUpdate && selectedCategory) {
      setValue("name", selectedCategory.name);
    }

    if (isAdd) {
      reset();
    }
  }, [mode, selectedCategory]);

  const openAdd = () => {
    setMode("add");
    setSelectedCategory(null);
    setShow(true);
  };

  const openUpdate = (category) => {
    setMode("update");
    setSelectedCategory(category);
    setShow(true);
  };

  const openDelete = (category) => {
    setMode("delete");
    setSelectedCategory(category);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data) => {
    if (isAdd) {
      await addCategory(data);
    }

    if (isUpdate) {
      await updateCategory(selectedCategory.id, data);
    }

    if (isDelete) {
      await deleteCategory(selectedCategory.id);
    }

    fetchCategories();
    handleClose();
  };

  return (
    <>
      <Header
        imageSize={"w-50"}
        title={"Items"}
        spanText={"Categories"}
        imgUrl={HeaderImage}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <SubHeader
        title={"Categories Table Details"}
        description={"You can check all details"}
        showButton={true}
        buttonTitle={"Add New Category"}
        OnClick={openAdd}
      />

      {/* ONE MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isAdd && "Add Category"}
            {isUpdate && "Update Category"}
            {isDelete && "Delete Category"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {(isAdd || isUpdate) && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("name", { required: "Name is Required" })}
                className="form-control my-2"
                placeholder="Category Name"
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}

              <div className="d-flex justify-content-end mt-4">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  className="ms-3"
                  disabled={loading}
                >
                  {loading ? "Loading..." : isAdd ? "Save" : "Update"}
                </Button>
              </div>
            </form>
          )}

          {isDelete && (
            <>
              <>
                <ConfirmDelete
                  Item={`Category ${selectedCategory?.name}`}
                  category={selectedCategory}
                />
              </>

              <div className="d-flex justify-content-end mt-4">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={onSubmit}
                  className="ms-3"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Delete"}
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      <div className="table-container p-3">
        {loading ? (
          <LoaderSpinner />
        ) : categories.length ? (
          <div className="table-responsive vh-100">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{(pageNumber - 1) * 10 + index + 1}</td>

                    <td>{category.name}</td>
                    <td>
                      {new Date(category.creationDate).toLocaleDateString()}
                    </td>
                    <td>
                      <ActionButtons
                        onUpdate={() => openUpdate(category)}
                        onDelete={() => openDelete(category)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={pageNumber}
              totalPages={totalNumberOfPages}
              onPageChange={(page) => fetchCategories(page)}
            />
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
