import { create } from "zustand";
import { useRecipes } from "../Hooks/useRecipes";
import { useCategory } from "../Hooks/useCategories";
import { toast } from "react-toastify";

let { getCategoryList, deleteCategoryById, addCategoryApi, updateCategoryApi } =
  useCategory();

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  pageNumber: 1,
  totalNumberOfPages: 1,
  fetchCategories: async (page = 1) => {
    try {
      set({ loading: true });
      const data = await getCategoryList(page);

      set({
        categories: data.data,
        loading: false,
        pageNumber: data.pageNumber,
        totalNumberOfPages: data.totalNumberOfPages,
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
    set({ loading: true });
    const prevCategories = get().categories;

    // Optimistic update
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    }));

    try {
      await deleteCategoryById(id);
      set({ loading: false });
      toast.success("Category deleted successfully");

      set({
        categories: data,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        categories: prevCategories,
        loading: false,
        error: "Error deleting categories",
      });
    }
  },
  addCategory: async (newCategory) => {
    try {
      set({ loading: true });
      let response = await addCategoryApi(newCategory);
      set({ loading: false });
      toast.success("Category has been added successfully!");
    } catch (error) {
      set({
        loading: false,
        error: "Error adding Category",
      });
    }
  },
  updateCategory: async (id, data) => {
    try {
      set({ loading: true });
      let response = await updateCategoryApi(id, data);
      console.log(response);
      set({ loading: false });

      toast.success("Category has been Updated successfully!");
      return true;
    } catch (error) {
      set({
        loading: false,
        error: "Error adding Category",
      });
    }
  },
}));
