import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";
import { toast } from "react-toastify";

let { getRecipesList, deleteRecipeById, addRecipeApi, updateRecipeApi } =
  useRecipes();
export const useRecipesStore = create((set, get) => ({
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
    const prevRecipes = get().recipes;

    // Optimistic update
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    }));

    try {
      await deleteRecipeById(id);
      set({ loading: false });
      toast.success("Recipe deleted successfully");
    } catch (error) {
      set({
        recipes: prevRecipes,
        loading: false,
        error: "Error deleting recipes",
      });
    }
  },

  addRecipe: async (newRecipe) => {
    try {
      let response = await addRecipeApi(newRecipe);
      toast.success(response.message);
    } catch (error) {
      set({
        loading: false,
        error: "Error adding recipe",
      });
    }
  },
  updateRecipe: async (id, updatedRecipe) => {
    try {
      const response = await updateRecipeApi(id, updatedRecipe);
      toast.success(response.message || "Recipe updated successfully");
      // refresh list
      await get().fetchRecipes();
      return response;
    } catch (error) {
      set({ loading: false, error: "Error updating recipe" });
      return null;
    }
  },
}));
