import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";
import { toast } from "react-toastify";

let {
  getRecipesList,
  deleteRecipeById,
  addRecipeApi,
  updateRecipeApi,
  addToFavApi,
  getFavRecipesApi,
  deleteFromFavApi,
} = useRecipes();
export const useRecipesStore = create((set, get) => ({
  recipes: [],
  loading: false,
  pageNumber: 1,
  totalNumberOfPages: 1,
  favRecipes: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  },
  fetchRecipes: async (page = 1) => {
    try {
      set({ loading: true });
      const data = await getRecipesList(page);
      set({
        recipes: data.data,
        pageNumber: data.pageNumber,
        totalNumberOfPages: data.totalNumberOfPages,
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
    set({ loading: true });

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
      set({ loading: true });
      let response = await addRecipeApi(newRecipe);
      set({ loading: false });
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
      set({ loading: true });
      const response = await updateRecipeApi(id, updatedRecipe);
      toast.success(response.message || "Recipe updated successfully");
      set({ loading: false });
      // refresh list
      await get().fetchRecipes();
      return response;
    } catch (error) {
      set({ loading: false, error: "Error updating recipe" });
      return null;
    }
  },
  userAddToFav: async (id) => {
    try {
      set({ loading: true });
      const response = await addToFavApi(id);
      console.log(response);

      toast.success(response.message || "Recipe Added successfully");
      await get().getFavs();

      set({ loading: false });
      // refresh list
      return response;
    } catch (error) {
      set({ loading: false, error: "Error Add recipe to fav" });
      return null;
    }
  },
  getFavs: async () => {
    try {
      set({ loading: true });
      const response = await getFavRecipesApi();
      console.log(response.data);
      set({
        favRecipes: {
          data: response.data || [], // array ثابتة
          pageNumber: response.data?.pageNumber || 1,
          pageSize: response.data?.pageSize || 5,
          totalNumberOfPages: response.data?.totalNumberOfPages || 0,
          totalNumberOfRecords: response.data?.totalNumberOfRecords || 0,
        },
        loading: false,
      });
      // refresh list
      return response.data;
    } catch (error) {
      set({ loading: false, error: "Error Add recipe to fav" });
      return null;
    }
  },
  deleteFav: async (id) => {
    try {
      set({ loading: true });
      const response = await deleteFromFavApi(id);
      toast.success(response.message || "Fav Recipe deleted successfully");
      await get().getFavs();

      console.log(response);
      set({ loading: false });
      // refresh list
      return response;
    } catch (error) {
      set({ loading: false, error: "Error Add recipe to fav" });
      return null;
    }
  },
}));
