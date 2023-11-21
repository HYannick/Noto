import {Category, CategoryToCreate} from '@/domain/Category.ts';
import {mockNote} from './notes.mocks';

export const mockCategory = (opts?: Partial<Category>): Category => ({
  id: 'vapor-Category',
  name: 'Vaporwave',
  notes: [mockNote()],
  ...opts,
})

export const mockCategoryToCreate = (opts?: Partial<CategoryToCreate>): CategoryToCreate => ({
  name: 'New Vaporwave Category',
  notes: [mockNote()],
  ...opts,
})