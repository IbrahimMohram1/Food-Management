import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";

let { getRecipesList } = useRecipes();

export const useRecipesStore = create((set) => ({
  recipes: [],
  fetchRecipes: async () => {
    try {
      const { data } = await getRecipesList();
      console.log(data);

      set({
        recipes: data,
        error: null,
      });
    } catch (error) {
      set({
        error: err.response?.data?.message || "Error fetching recipes",
      });
    }
  },
}));
