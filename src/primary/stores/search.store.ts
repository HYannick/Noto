import {create} from 'zustand';

interface SearchStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void
}
export const useSearchStore = create<SearchStoreState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query: string) => set({searchQuery: query}),
}))