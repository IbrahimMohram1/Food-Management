import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";

let { getRecipesList, deleteRecipeById } = useRecipes();

export const useRecipesStore = create((set) => ({
  recipes: [],
  loading: true,
  fetchRecipes: async () => {
    try {
      const { data } = await getRecipesList();

      set({
        recipes: data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: err.response?.data?.message || "Error fetching recipes",
      });
    }
  },
  deleteRecipe: async (id) => {
    try {
      const data = await deleteRecipeById(id);
      set({
        recipes: data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: err.response?.data?.message || "Error deleting recipes",
      });
    }
  },
}));
