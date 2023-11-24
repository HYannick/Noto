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

export const dumbCategories = [
  {
    "id": "Shopping",
    "name": "Shopping"
  },
  {
    "id": "Food",
    "name": "Food"
  },
  {
    "id": "Work",
    "name": "Work"
  },
  {
    "id": "Meetings",
    "name": "Meetings"
  },
  {
    "id": "Books",
    "name": "Books"
  },
  {
    "id": "Leisure",
    "name": "Leisure"
  },
  {
    "id": "Travel",
    "name": "Travel"
  },
  {
    "id": "Vacation",
    "name": "Vacation"
  }
]

