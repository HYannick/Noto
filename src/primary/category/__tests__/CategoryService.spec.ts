import { expect, describe, vi, it } from 'vitest';
import {CategoryService} from '@/primary/category/CategoryService.ts';
import {mockCategory, mockCategoryToCreate} from '@tests/fixtures/categories.mocks.ts';
import {mockCategoryResource} from '@tests/fixtures/common.mocks.ts';

const categoryResource = mockCategoryResource({
  getAllCategories: vi.fn().mockResolvedValue([mockCategory()]),
  createCategory: vi.fn().mockResolvedValue(mockCategory()),
  getCategoryById: vi.fn().mockResolvedValue(mockCategory({id: 'inokuni'})),
  deleteCategoryById: vi.fn().mockResolvedValue([mockCategory({id: 'inokuni'})])
})
describe('CategoryService', () => {
  it('should get all categories', async () => {
    const categoryService = CategoryService(categoryResource);
    const categories = await categoryService.getAllCategories();
    expect(categoryResource.getAllCategories).toHaveBeenCalled()
    expect(categories).toEqual([mockCategory()])
  });
  it('should create a Category', async () => {
    const categoryService = CategoryService(categoryResource);

    const category = await categoryService.createCategory(mockCategoryToCreate());
    expect(categoryResource.createCategory).toHaveBeenCalledWith(mockCategoryToCreate());
    expect(category).toEqual(mockCategory())
  });
  it('should get a Category by id', async () => {
    const categoryService = CategoryService(categoryResource);

    const category = await categoryService.getCategoryById('inokuni');
    expect(categoryResource.getCategoryById).toHaveBeenCalledWith('inokuni');
    expect(category).toEqual(mockCategory({id: 'inokuni'}))
  });

  it('should remove a Category by id', async () => {
    const categoryService = CategoryService(categoryResource);
    await categoryService.deleteCategoryById('inokuni');
    expect(categoryResource.deleteCategoryById).toHaveBeenCalledWith('inokuni');
  });
});