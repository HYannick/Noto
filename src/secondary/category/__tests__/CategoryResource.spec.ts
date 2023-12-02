import {expect, describe, vi, it, beforeEach} from 'vitest';
import {CategoryResource} from '../CategoryResource.ts';
import {mockCategory, mockCategoryToCreate} from '@tests/fixtures/categories.mocks.ts';
import {mockNoteResource} from '@tests/fixtures/common.mocks.ts';
import {mockNote} from '@tests/fixtures/notes.mocks.ts';

let mockedDB: any;
let noteResource: any;
vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('1')
}))

describe('CategoryResource', () => {
  beforeEach(() => {
    mockedDB = {
      getItem: vi.fn().mockResolvedValue([
        mockCategory(),
        mockCategory({id: 'aesthetic-Category', name: 'New Aesthetic Category', notes: []}),
      ]),
      setItem: vi.fn().mockResolvedValue('OK')
    }

    noteResource = mockNoteResource({
      getAllNotes: vi.fn().mockResolvedValue([
        mockNote({
          id: '1',
          categories: ['aesthetic-Category']
        }), mockNote({
          id: '1',
          categories: ['tokyo-Category', 'aesthetic-Category', 'random-cat']
        })
      ]),
    })
  })
  it('should get categories', async () => {
    const resource = CategoryResource(mockedDB, noteResource);
    const categories = await resource.getAllCategories();
    expect(mockedDB.getItem).toHaveBeenCalledWith('categories')
    expect(categories).toEqual([
      mockCategory(),
      mockCategory({id: 'aesthetic-Category', name: 'New Aesthetic Category', notes: []})
    ])
  });

  it('should return empty array if no categories', async () => {
    mockedDB.getItem = vi.fn().mockResolvedValue(null)
    const resource = CategoryResource(mockedDB, noteResource);
    const categories = await resource.getAllCategories();
    expect(mockedDB.getItem).toHaveBeenCalledWith('categories')
    expect(categories).toEqual([])
  });

  it('should create a Category', async () => {
    const resource = CategoryResource(mockedDB, noteResource);
    const CategoryToCreate = mockCategoryToCreate();

    await resource.createCategory(CategoryToCreate);
    expect(mockedDB.getItem).toHaveBeenCalledWith('categories')
    expect(mockedDB.setItem).toHaveBeenCalledWith('categories', [
      mockCategory(),
      mockCategory({id: 'aesthetic-Category', name: 'New Aesthetic Category', notes: []}),
      {
        ...CategoryToCreate,
        id: '1'
      }
    ])
  });

  it('should update a Category', async () => {
    const resource = CategoryResource(mockedDB, noteResource);
    const CategoryToUpdate = mockCategory({id: 'aesthetic-Category', name: 'updated Category'});

    await resource.updateCategory('aesthetic-Category', CategoryToUpdate);
    expect(mockedDB.getItem).toHaveBeenCalledWith('categories')
    expect(mockedDB.setItem).toHaveBeenCalledWith('categories', [
      mockCategory(),
      mockCategory({id: 'aesthetic-Category', name: 'updated Category'}),
    ])
  });

  it('should get Category by id', async () => {
    const resource = CategoryResource(mockedDB, noteResource);

    const Category = await resource.getCategoryById('aesthetic-Category');
    expect(mockedDB.getItem).toHaveBeenCalledWith('categories');
    expect(Category).toEqual(mockCategory({id: 'aesthetic-Category', name: 'New Aesthetic Category', notes: []}))
  });

  it('should delete a Category', async () => {
    mockedDB = {
      getItem: vi.fn().mockResolvedValue([
        mockCategory(),
        mockCategory({id: 'aesthetic-Category', name: 'New Aesthetic Category', notes: []}),
        mockCategory({id: 'yokohama-Category', name: 'New Aesthetic Category', notes: []}),
        mockCategory({id: 'tokyo-Category', name: 'New Aesthetic Category', notes: []}),
      ]),
      setItem: vi.fn().mockResolvedValue('OK')
    }
    const resource = CategoryResource(mockedDB, noteResource);

    const categories = await resource.deleteCategoriesById(['aesthetic-Category', 'tokyo-Category']);
    expect(mockedDB.getItem).toHaveBeenCalledWith('categories');
    expect(noteResource.unbindCategoriesFromNotes).toHaveBeenCalledWith(['aesthetic-Category', 'tokyo-Category']);
    expect(categories).toEqual([
      mockCategory(),
      mockCategory({id: 'yokohama-Category', name: 'New Aesthetic Category', notes: []}),
    ])
  });
});