import { expect, describe, vi, it } from 'vitest';
import {CategoryService} from '@/primary/Category/CategoryService.ts';
import {mockCategory, mockCategoryToCreate} from '@tests/fixtures/Categorys.mocks.ts';
import {mockCategoryResource} from '@tests/fixtures/common.mocks.ts';

const CategoryResource = mockCategoryResource({
  getAllCategories: vi.fn().mockResolvedValue([mockCategory()]),
  createCategory: vi.fn().mockResolvedValue(mockCategory()),
  getCategoryById: vi.fn().mockResolvedValue(mockCategory({id: 'inokuni'})),
  deleteCategoryById: vi.fn().mockResolvedValue([mockCategory({id: 'inokuni'})])
})
describe('CategoryService', () => {
  it('should get all Categorys', async () => {
    const CategoryService = CategoryService(CategoryResource);
    const Categorys = await CategoryService.getAllCategories();
    expect(CategoryResource.getAllCategories).toHaveBeenCalled()
    expect(Categorys).toEqual([mockCategory()])
  });
  it('should create a Category', async () => {
    const CategoryService = CategoryService(CategoryResource);

    const Category = await CategoryService.createCategory(mockCategoryToCreate());
    expect(CategoryResource.createCategory).toHaveBeenCalledWith(mockCategoryToCreate());
    expect(Category).toEqual(mockCategory())
  });
  it('should get a Category by id', async () => {
    const CategoryService = CategoryService(CategoryResource);

    const Category = await CategoryService.getCategoryById('inokuni');
    expect(CategoryResource.getCategoryById).toHaveBeenCalledWith('inokuni');
    expect(Category).toEqual(mockCategory({id: 'inokuni'}))
  });

  it('should remove a Category by id', async () => {
    const CategoryService = CategoryService(CategoryResource);
    await CategoryService.deleteCategoryById('inokuni');
    expect(CategoryResource.deleteCategoryById).toHaveBeenCalledWith('inokuni');
  });
});