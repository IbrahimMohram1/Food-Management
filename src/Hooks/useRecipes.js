import axiosClient from "../Utils/axiosClient";

export const useRecipes = () => {
  const getRecipesList = async () => {
    const { data } = await axiosClient.get("/Recipe/?pageSize=10&pageNumber=1");
    return data;
  };
  const deleteRecipeById = async (id) => {
    const { data } = await axiosClient.delete(`/Recipe/${id}`);
    return data;
  };
  return { getRecipesList, deleteRecipeById };
};
