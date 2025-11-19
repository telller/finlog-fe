import { create } from 'zustand'
import {getTagsList} from "../services/tag.service.ts";
import type {Tag} from "../types/tag.ts";

interface TagsListState {
    tags: Tag[]
    getTagsList: () => Promise<void>
}

export const useTagsList = create<TagsListState>((set) => ({
    tags: [],
    getTagsList: async () => {
        const res = await getTagsList()
        set({ tags: res.data })
    },
}))