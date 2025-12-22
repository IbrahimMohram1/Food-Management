import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";
import { useUsers } from "../Hooks/useUsers";

let { getUsersList } = useUsers();

export const useUsersStore = create((set, get) => ({
  users: [],
  loading: false,
  pageNumber: 1,
  totalNumberOfPages: 1,
  fetchUsersList: async (page = 1) => {
    try {
      set({ loading: true });

      const data = await getUsersList(page);
      console.log(data);
      set({
        users: data.data,
        pageNumber: data.pageNumber,
        totalNumberOfPages: data.totalNumberOfPages,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: "Error fetching recipes",
      });
    }
  },
}));
