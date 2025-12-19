import { create } from "zustand";
import { useTags } from "../Hooks/useTags";

let { getTagsList } = useTags();
export const useTagsStore = create((set) => ({
  tags: [],
  fetchTags: async () => {
    try {
      const tagsData = await getTagsList();
      set({ tags: tagsData });
    } catch (error) {
      set({ tags: [] });
    }
  },
}));
