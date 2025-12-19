import axiosClient from "../Utils/axiosClient";

export const useTags = () => {
  const getTagsList = async () => {
    const { data } = await axiosClient.get("/tag");
    return data;
  };

  return { getTagsList };
};
