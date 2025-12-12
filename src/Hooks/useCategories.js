import axiosClient from "../Utils/axiosClient";

export const useCategory = () => {
  const getCategoryList = async () => {
    const { data } = await axiosClient.get(
      "/Category/?pageSize=10&pageNumber=1",
    );
    return data;
  };
  return { getCategoryList };
};
