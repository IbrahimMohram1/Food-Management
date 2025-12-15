import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";
import { useUsersList } from "../Hooks/useUsers";

let { getUsersList } = useUsers();

export const useUsersStore = create((set) => ({
  users: [],
  fetchUsersList: async () => {
    try {
      const { data } = await getUsersList();
      console.log(data);

      set({
        users: data,
        error: null,
      });
    } catch (error) {
      set({
        error: err.response?.data?.message || "Error fetching recipes",
      });
    }
  },
}));
