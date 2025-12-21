import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTagsStore } from "../../../store/tagsStore";
import { useCategoryStore } from "../../../store/categoryStore";
import { useForm } from "react-hook-form";
import { useRecipesStore } from "../../../store/recipesStore";
import { LuUpload } from "react-icons/lu";

export default function RecipeData() {
  const { tags, fetchTags } = useTagsStore();
  let { fetchCategories, categories } = useCategoryStore();
  let { addRecipe, updateRecipe, recipes, loading } = useRecipesStore();
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
  });
  const imagePathToFile = async (imagePath) => {
    const response = await fetch(
      `https://upskilling-egypt.com:3006/${imagePath}`,
    );
    const blob = await response.blob();

    return new File([blob], "old-image.jpg", {
      type: blob.type,
    });
  };

  const AppendToFormData = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    if (data.recipeImage?.length) {
      // صورة جديدة
      formData.append("recipeImage", data.recipeImage[0]);
    } else if (isEdit && recipeToEdit?.imagePath) {
      // صورة قديمة → نحولها File
      const oldImageFile = await imagePathToFile(recipeToEdit.imagePath);
      formData.append("recipeImage", oldImageFile);
    }

    return formData;
  };
  const { id } = useParams();
  const isEdit = Boolean(id);

  const onSubmit = async (data) => {
    let recipesData = await AppendToFormData(data);
    if (isEdit) {
      const result = await updateRecipe(id, recipesData);
      if (result) navigate("/dashboard/recipes");
    } else {
      const result = await addRecipe(recipesData);
      if (result) {
        navigate("/dashboard/recipes");
      }
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchTags();

    if (id) {
      const found = recipes.find((item) => item.id === parseInt(id));
      console.log(found);

      if (found) {
        setRecipeToEdit(found);

        setValue("name", found.name || "");
        setValue("tagId", found.tag?.id || "");
        setValue("price", found.price || "");
        setValue("categoriesIds", found.category?.[0]?.id || "");
        setValue("description", found.description || "");
      }
    }
  }, [id]);
  return (
    <>
      <div className="p-5  d-flex justify-content-between align-items-center ">
        <div className="caption">
          <h4>
            {isEdit ? "Edit" : "Fill the"}{" "}
            <span className="fw-bold">Recipes</span> !
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
            placeholder="Recipes Name"
            aria-label="name"
            aria-describedby="basic-addon1"
          />
          {errors.name && (
            <span className="text-danger my-2">{errors.name.message}</span>
          )}
          <select
            className="form-control my-2"
            {...register("tagId", { required: "Tag is Required" })}
          >
            <option>Select Tag </option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tagId && (
            <span className="text-danger my-2">{errors.tagId.message}</span>
          )}
          <input
            {...register("price", { required: "Price is Required" })}
            type="number"
            className="form-control my-2"
            placeholder="Recipes Price"
            aria-describedby="basic-addon1"
          />
          {errors.price && (
            <span className="text-danger my-2">{errors.price.message}</span>
          )}
          <select
            className="form-control my-2"
            {...register("categoriesIds", { required: "Category is Required" })}
          >
            <option>Select Category </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoriesIds && (
            <span className="text-danger my-2">
              {errors.categoriesIds.message}
            </span>
          )}
          <textarea
            {...register("description", {
              required: "Description is Required",
            })}
            className="form-control"
            placeholder="Recipes Description"
          ></textarea>
          {errors.description && (
            <span className="text-danger my-2">
              {errors.description.message}
            </span>
          )}
          <label
            htmlFor="recipeImageInput"
            className="customFileInput p-4 my-3 d-flex flex-column justify-content-center align-items-center"
            style={{ cursor: "pointer" }}
          >
            <LuUpload className="fs-2 my-2" />
            <p className="mb-0">
              Drag & Drop or{" "}
              <span className="text-main fw-bold">Choose a Item Image</span> to
              Upload
            </p>
          </label>
          <input
            {...register("recipeImage", {
              required: !isEdit && "Image Is Required",
            })}
            id="recipeImageInput"
            type="file"
            accept="image/*"
            className="form-control my-2 d-none"
            placeholder="Recipe Image"
            aria-describedby="basic-addon1"
          />

          <div className="d-flex justify-content-end mt-4">
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className="btn  btn-outline-success px-4  mx-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success px-4 mx-3"
              disabled={loading}
            >
              {loading ? "Loading..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
