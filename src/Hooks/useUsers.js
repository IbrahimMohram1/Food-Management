import axiosClient from "../Utils/axiosClient";

export const useUsers = () => {
  const getUsersList = async () => {
    const { data } = await axiosClient.get("Users/?pageSize=10&pageNumber=1");
    return data;
  };
  return { getUsersList };
};
