import {v4 as uuidv4} from 'uuid';
import {Category, CategoryToCreate} from '@/domain/Category.ts';

export interface CategoryResourceRepository {
  getAllCategories: () => Promise<Category[]>;
  createCategory: (CategoryToCreate: CategoryToCreate) => Promise<Category>;
  updateCategory: (CategoryId: string, CategoryToUpdate: Category) => Promise<Category>;
  getCategoryById: (CategoryId: string) => Promise<Category>;
  deleteCategoryById: (CategoryId: string) => Promise<Category[]>;
}

const toCategory = (CategoryToCreate: CategoryToCreate): Category => ({
  id: uuidv4(),
  name: CategoryToCreate.name,
  notes: CategoryToCreate.notes,
})

export const CategoryResource = (storage: LocalForage): CategoryResourceRepository => {
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

  const updateCategory = async (CategoryId: string, CategoryToUpdate: Category): Promise<Category> => {
    const categories = await getAllCategories();
    const CategoryToUpdateIndex = categories.findIndex(Category => Category.id === CategoryId);
    categories[CategoryToUpdateIndex] = CategoryToUpdate;
    await storage.setItem('categories', categories);
    return CategoryToUpdate;
  }

  const getCategoryById = async (CategoryId: string): Promise<Category> => {
    const categories = await getAllCategories();
    return categories.find(Category => Category.id === CategoryId)!;
  }

  const deleteCategoryById = async (CategoryId: string): Promise<Category[]> => {
    const categories = await getAllCategories();
    const updatedNotes = categories.filter(Category => Category.id !== CategoryId);
    await storage.setItem('categories', updatedNotes);
    return updatedNotes;
  }


  return {
    getAllCategories,
    createCategory,
    updateCategory,
    getCategoryById,
    deleteCategoryById,
  }
}