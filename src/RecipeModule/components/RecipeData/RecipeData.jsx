import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTagsStore } from "../../../store/tagsStore";
import { useCategoryStore } from "../../../store/categoryStore";
import { useForm } from "react-hook-form";
import { useRecipesStore } from "../../../store/recipesStore";

export default function RecipeData() {
  const { tags, fetchTags } = useTagsStore();
  let { fetchCategories, categories } = useCategoryStore();
  let { addRecipe, updateRecipe, recipes } = useRecipesStore();
  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const AppendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };
  const { id } = useParams();
  const isEdit = Boolean(id);

  const onSubmit = async (data) => {
    let recipesData = AppendToFormData(data);
    if (isEdit) {
      const result = await updateRecipe(id, recipesData);
      if (result) navigate("/dashboard/recipes");
    } else {
      const result = await addRecipe(recipesData);
      if (result?.success) {
        navigate("/dashboard/recipes");
      }
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (id) {
      const recipeToEdit = recipes.find((item) => item.id === parseInt(id));
      if (recipeToEdit) {
        setValue("name", recipeToEdit.name || "");
        setValue("tagId", recipeToEdit.tag?.id || "");
        setValue("price", recipeToEdit.price || "");
        setValue("categoriesIds", recipeToEdit.category?.[0]?.id || "");
        setValue("description", recipeToEdit.description || "");
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
          <input
            {...register("recipeImage", {
              required: isEdit ? "Recipe Image is Required" : false,
            })}
            type="file"
            className="form-control my-2"
            placeholder="Recipe Image"
            aria-describedby="basic-addon1"
          />
          {errors.recipeImage && (
            <span className="text-danger my-2">
              {errors.recipeImage.message}
            </span>
          )}
          <div className="d-flex justify-content-end mt-4">
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className="btn  btn-outline-success px-4  mx-3"
            >
              Cancel
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
