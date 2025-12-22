import React from "react";

export default function ChangePassword() {
  return (
    <>
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
