import {create} from 'zustand';
import {Category} from '@/domain/Category.ts';

export interface CategoriesStoreState {
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}
export const useCategoriesStore = create<CategoriesStoreState>((set) => ({
  selectedCategory: 'all',
  categories: [],
  setCategories: (categories: Category[]) => set({categories}),
  setSelectedCategory: (selectedCategory: string) => set({selectedCategory}),
}))