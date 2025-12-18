import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";
import { useCategory } from "../Hooks/useCategories";

let { getCategoryList, deleteCategoryById } = useCategory();

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: true,
  fetchCategories: async () => {
    try {
      const { data } = await getCategoryList();
      console.log(data);

      set({
        categories: data,
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
  deleteCategory: async (id) => {
    try {
      const data = await deleteCategoryById(id);
      console.log(`Delete Category ${id} is Success`);

      set({
        categories: data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,

        error: err.response?.data?.message || "Error deleting categories",
      });
    }
  },
}));
