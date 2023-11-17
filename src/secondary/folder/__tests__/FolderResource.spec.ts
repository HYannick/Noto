import {expect, describe, vi, it, beforeEach} from 'vitest';
import {FolderResource} from '../FolderResource.ts';
import {mockFolder, mockFolderToCreate} from '@tests/fixtures/folders.mocks.ts';

let mockedDB: any;

vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('1')
}))

describe('FolderResource', () => {
  beforeEach(() => {
    mockedDB = {
      getItem: vi.fn().mockResolvedValue([
        mockFolder(),
        mockFolder({id: 'aesthetic-folder', name: 'New Aesthetic Folder', notes: []}),
      ]),
      setItem: vi.fn().mockResolvedValue('OK')
    }
  })
  it('should get folders', async () => {
    const resource = FolderResource(mockedDB);
    const folders = await resource.getAllFolders();
    expect(mockedDB.getItem).toHaveBeenCalledWith('folders')
    expect(folders).toEqual([
      mockFolder(),
      mockFolder({id: 'aesthetic-folder', name: 'New Aesthetic Folder', notes: []})
    ])
  });

  it('should return empty array if no folders', async () => {
    mockedDB.getItem = vi.fn().mockResolvedValue(null)
    const resource = FolderResource(mockedDB);
    const folders = await resource.getAllFolders();
    expect(mockedDB.getItem).toHaveBeenCalledWith('folders')
    expect(folders).toEqual([])
  });

  it('should create a folder', async () => {
    const resource = FolderResource(mockedDB);
    const folderToCreate = mockFolderToCreate();

    await resource.createFolder(folderToCreate);
    expect(mockedDB.getItem).toHaveBeenCalledWith('folders')
    expect(mockedDB.setItem).toHaveBeenCalledWith('folders', [
      mockFolder(),
      mockFolder({id: 'aesthetic-folder', name: 'New Aesthetic Folder', notes: []}),
      {
        ...folderToCreate,
        id: '1'
      }
    ])
  });

  it('should update a folder', async () => {
    const resource = FolderResource(mockedDB);
    const folderToUpdate = mockFolder({id: 'aesthetic-folder', name: 'updated folder'});

    await resource.updateFolder('aesthetic-folder', folderToUpdate);
    expect(mockedDB.getItem).toHaveBeenCalledWith('folders')
    expect(mockedDB.setItem).toHaveBeenCalledWith('folders', [
      mockFolder(),
      mockFolder({id: 'aesthetic-folder', name: 'updated folder'}),
    ])
  });

  it('should get folder by id', async () => {
    const resource = FolderResource(mockedDB);

    const folder = await resource.getFolderById('aesthetic-folder');
    expect(mockedDB.getItem).toHaveBeenCalledWith('folders');
    expect(folder).toEqual(mockFolder({id: 'aesthetic-folder', name: 'New Aesthetic Folder', notes: []}))
  });

  it('should delete a folder', async () => {
    const resource = FolderResource(mockedDB);

    const folders = await resource.deleteFolderById('aesthetic-folder');
    expect(mockedDB.getItem).toHaveBeenCalledWith('folders');
    expect(folders).toEqual([
      mockFolder()
    ])
  });
});