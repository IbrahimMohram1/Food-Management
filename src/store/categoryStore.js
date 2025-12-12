import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";
import { useCategory } from "../Hooks/useCategories";

let { getCategoryList } = useCategory();

export const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const { data } = await getCategoryList();
      console.log(data);

      set({
        categories: data,
        error: null,
      });
    } catch (error) {
      set({
        error: err.response?.data?.message || "Error fetching recipes",
      });
    }
  },
}));
