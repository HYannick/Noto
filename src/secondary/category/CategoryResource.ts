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
      const Categorys = await storage.getItem('Categorys') as Category[];
      if(!Categorys) throw Error;
      return Categorys;
    } catch (e) {
      return []
    }
  }

  const createCategory = async (CategoryToCreate: CategoryToCreate): Promise<Category> => {
    const Categorys = await getAllCategories();
    const newCategory = toCategory(CategoryToCreate)
    await storage.setItem('Categorys', [...Categorys, newCategory]);
    return newCategory;
  }

  const updateCategory = async (CategoryId: string, CategoryToUpdate: Category): Promise<Category> => {
    const Categorys = await getAllCategories();
    const CategoryToUpdateIndex = Categorys.findIndex(Category => Category.id === CategoryId);
    Categorys[CategoryToUpdateIndex] = CategoryToUpdate;
    await storage.setItem('Categorys', Categorys);
    return CategoryToUpdate;
  }

  const getCategoryById = async (CategoryId: string): Promise<Category> => {
    const Categorys = await getAllCategories();
    return Categorys.find(Category => Category.id === CategoryId)!;
  }

  const deleteCategoryById = async (CategoryId: string): Promise<Category[]> => {
    const Categorys = await getAllCategories();
    const updatedNotes = Categorys.filter(Category => Category.id !== CategoryId);
    await storage.setItem('Categorys', updatedNotes);
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