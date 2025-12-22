import axiosClient from "../Utils/axiosClient";

export const useUsers = () => {
  const getUsersList = async (page) => {
    const { data } = await axiosClient.get(
      `Users/?pageSize=10&pageNumber=${page}`,
    );
    return data;
  };
  return { getUsersList };
};
