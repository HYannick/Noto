import {CategoryResourceRepository} from '@/secondary/category/CategoryResource.ts';
import {Category, CategoryToCreate} from '@/domain/Category.ts';

export interface ICategoryService {
  getAllCategories: () => Promise<Category[]>;
  createCategory: (categoryToCreate: CategoryToCreate) =>  Promise<Category>;
  updateCategory: (categoryId: string, categoryToUpdate: Category) => Promise<Category>;
  getCategoryById: (categoryId: string) => Promise<Category>;
  deleteCategoriesById: (categoryIds: string[]) => Promise<void>;
}

export const CategoryService = (categoryResource: CategoryResourceRepository): ICategoryService => {
  const getAllCategories = async () => {
    return await categoryResource.getAllCategories();
  }
  const createCategory = async (CategoryToCreate: CategoryToCreate) => {
    return await categoryResource.createCategory(CategoryToCreate);
  }

  const updateCategory = async (CategoryId: string, categoryToUpdate: Category) => {
    return await categoryResource.updateCategory(CategoryId, categoryToUpdate);
  }

  const getCategoryById = async (CategoryId: string): Promise<Category> =>  {
    return await categoryResource.getCategoryById(CategoryId);
  }
  const deleteCategoriesById = async (CategoryIds: string[]): Promise<void> =>  {
    await categoryResource.deleteCategoriesById(CategoryIds);
  }

  return {
    getCategoryById,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategoriesById
  }
}