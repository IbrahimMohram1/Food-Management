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
  const addRecipeApi = async (values) => {
    const { data } = await axiosClient.post("/Recipe", values);
    return data;
  };
  const updateRecipeApi = async (id, values) => {
    const { data } = await axiosClient.put(`/Recipe/${id}`, values);
    return data;
  };
  return { getRecipesList, deleteRecipeById, addRecipeApi, updateRecipeApi };
};
