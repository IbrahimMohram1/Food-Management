import axiosClient from "../Utils/axiosClient";

export const useRecipes = () => {
  const getRecipesList = async (page) => {
    const { data } = await axiosClient.get(
      `/Recipe/?pageSize=10&pageNumber=${page}`,
    );
    return data;
  };
  const deleteRecipeById = async (id) => {
    const { data } = await axiosClient.delete(`/Recipe/${id}`);
    return data;
  };
  const addRecipeApi = async (values) => {
    const { data } = await axiosClient.post("/Recipe", values);
    return data;
  };
  const updateRecipeApi = async (id, values) => {
    const { data } = await axiosClient.put(`/Recipe/${id}`, values);
    return data;
  };
  const addToFavApi = async (id) => {
    const { data } = await axiosClient.post(`/userRecipe`, { recipeId: id });
    return data;
  };
  const deleteFromFavApi = async (id) => {
    const { data } = await axiosClient.delete(`/userRecipe/${id}`);
    return data;
  };
  const getFavRecipesApi = async () => {
    const { data } = await axiosClient.get(`/userRecipe`);
    return data;
  };
  return {
    getRecipesList,
    deleteRecipeById,
    addRecipeApi,
    updateRecipeApi,
    addToFavApi,
    deleteFromFavApi,
    getFavRecipesApi,
  };
};
