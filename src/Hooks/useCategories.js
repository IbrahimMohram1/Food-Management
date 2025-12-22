import axiosClient from "../Utils/axiosClient";

export const useCategory = () => {
  const getCategoryList = async (page) => {
    const { data } = await axiosClient.get(
      `/Category/?pageSize=10&pageNumber=${page}`,
    );
    return data;
  };
  const deleteCategoryById = async (id) => {
    const { data } = await axiosClient.delete(`/Category/${id}`);
    return data;
  };
  const addCategoryApi = async (values) => {
    const { data } = await axiosClient.post("/Category", values);

    return data;
  };
  const updateCategoryApi = async (id, values) => {
    const { data } = await axiosClient.put(`/Category/${id}`, values);

    return data;
  };
  return {
    getCategoryList,
    deleteCategoryById,
    addCategoryApi,
    updateCategoryApi,
  };
};
