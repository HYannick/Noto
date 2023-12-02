import {v4 as uuidv4} from 'uuid';
import {Category, CategoryToCreate} from '@/domain/Category.ts';
import {NoteResourceRepository} from '@/secondary/note/NoteResource.ts';

export interface CategoryResourceRepository {
  getAllCategories: () => Promise<Category[]>;
  createCategory: (CategoryToCreate: CategoryToCreate) => Promise<Category>;
  updateCategory: (categoryId: string, CategoryToUpdate: Category) => Promise<Category>;
  getCategoryById: (categoryId: string) => Promise<Category>;
  deleteCategoriesById: (categoryIds: string[]) => Promise<Category[]>;
}

const toCategory = (CategoryToCreate: CategoryToCreate): Category => ({
  id: uuidv4(),
  name: CategoryToCreate.name,
  notes: CategoryToCreate.notes,
})

export const CategoryResource = (storage: LocalForage, noteResource: NoteResourceRepository): CategoryResourceRepository => {
  const getAllCategories = async (): Promise<Category[]> => {
    try {
      const categories = await storage.getItem('categories') as Category[];
      if(!categories) throw Error;
      return categories;
    } catch (e) {
      return []
    }
  }

  const createCategory = async (CategoryToCreate: CategoryToCreate): Promise<Category> => {
    const categories = await getAllCategories();
    const newCategory = toCategory(CategoryToCreate)
    await storage.setItem('categories', [...categories, newCategory]);
    return newCategory;
  }

  const updateCategory = async (categoryId: string, CategoryToUpdate: Category): Promise<Category> => {
    const categories = await getAllCategories();
    const CategoryToUpdateIndex = categories.findIndex(Category => Category.id === categoryId);
    categories[CategoryToUpdateIndex] = CategoryToUpdate;
    await storage.setItem('categories', categories);
    return CategoryToUpdate;
  }

  const getCategoryById = async (categoryId: string): Promise<Category> => {
    const categories = await getAllCategories();
    return categories.find(Category => Category.id === categoryId)!;
  }

  const deleteCategoriesById = async (categoryIds: string[]): Promise<Category[]> => {
    const categories = await getAllCategories();
    const categoryIdSet = new Set(categoryIds);
    const filteredCategories = categories.filter(category => !categoryIdSet.has(category.id));
    await storage.setItem('categories', filteredCategories);
    await noteResource.unbindCategoriesFromNotes(categoryIds);
    return filteredCategories;
  };


  return {
    getAllCategories,
    createCategory,
    updateCategory,
    getCategoryById,
    deleteCategoriesById,
  }
}