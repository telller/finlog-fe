import { create } from 'zustand';
import { getTagsList } from '@src/services/tag.service';
import type { Tag } from '@src/types';

interface TagsListState {
  getTagsList: () => Promise<void>;
  loading: boolean;
  tags: Tag[];
}

export const useTagsList = create<TagsListState>((set) => ({
  tags: [],
  loading: true,
  getTagsList: async () => {
    set({ loading: true });
    const res = await getTagsList();
    set({ tags: res.data, loading: false });
  },
}));
