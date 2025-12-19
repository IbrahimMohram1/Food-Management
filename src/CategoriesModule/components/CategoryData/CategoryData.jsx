import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryStore } from "../../../store/categoryStore";

export default function CategoryData() {
  let { addCategory, updateCategory, categories } = useCategoryStore();

  let {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
  });
  let navigate = useNavigate();

  const { id } = useParams();
  const isEdit = Boolean(id);
  const onSubmit = async (data) => {
    if (isEdit) {
      const result = await updateCategory(id, data);

      if (result) {
        navigate("/dashboard/categories");
      }
    } else {
      const result = await addCategory(data);
      if (result?.success) {
        navigate("/dashboard/categories");
      }
    }
  };
  useEffect(() => {
    if (id) {
      const categoryToEdit = categories.find(
        (item) => item.id === parseInt(id),
      );
      if (categoryToEdit) {
        setValue("name", categoryToEdit.name || "");
      }
    }
  }, [id]);

  return (
    <>
      <div className="p-5  d-flex justify-content-between align-items-center ">
        <div className="caption">
          <h4>
            {isEdit ? "Edit" : "Fill the"}{" "}
            <span className="fw-bold">Categories</span> !
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

      <div className="w-75 mx-auto p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "Name is Required" })}
            type="text"
            className="form-control my-2"
            placeholder="Category Name"
            aria-label="name"
            aria-describedby="basic-addon1"
          />
          {errors.name && (
            <span className="text-danger my-2">{errors.name.message}</span>
          )}

          <div className="d-flex justify-content-end mt-4">
            <button
              onClick={() => navigate("dashboard/categories")}
              className="btn  btn-outline-success px-4  mx-3"
            >
              Cancel{" "}
            </button>
            <button type="submit" className="btn btn-success px-4 mx-3">
              {isEdit ? "Update" : "Save"}
            </button>{" "}
          </div>
        </form>
      </div>
    </>
  );
}
