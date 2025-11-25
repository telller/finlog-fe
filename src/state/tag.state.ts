import { create } from 'zustand';
import { getTagsList } from '@src/services';
import type { Tag } from '@src/types';

interface TagsListState {
  tagsMap: Map<string, Omit<Tag, 'id'>>;
  getTagsList: () => Promise<void>;
  loading: boolean;
  tags: Tag[];
}

export const useTagsState = create<TagsListState>((set) => ({
  tags: [],
  loading: true,
  tagsMap: new Map(),
  getTagsList: async () => {
    set({ loading: true });
    const { data: tags }: { data: Tag[] } = await getTagsList();
    set({ tags, tagsMap: new Map(tags.map(({ id, ...rest }) => [id, rest])), loading: false });
  },
}));
