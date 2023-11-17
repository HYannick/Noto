import { expect, describe, vi, it } from 'vitest';
import {FolderService} from '@/primary/folder/FolderService.ts';
import {mockFolder, mockFolderToCreate} from '@tests/fixtures/folders.mocks.ts';
import {mockFolderResource} from '@tests/fixtures/common.mocks.ts';

const folderResource = mockFolderResource({
  getAllFolders: vi.fn().mockResolvedValue([mockFolder()]),
  createFolder: vi.fn().mockResolvedValue(mockFolder()),
  getFolderById: vi.fn().mockResolvedValue(mockFolder({id: 'inokuni'})),
  deleteFolderById: vi.fn().mockResolvedValue([mockFolder({id: 'inokuni'})])
})
describe('FolderService', () => {
  it('should get all folders', async () => {
    const folderService = FolderService(folderResource);
    const folders = await folderService.getAllFolders();
    expect(folderResource.getAllFolders).toHaveBeenCalled()
    expect(folders).toEqual([mockFolder()])
  });
  it('should create a folder', async () => {
    const folderService = FolderService(folderResource);

    const folder = await folderService.createFolder(mockFolderToCreate());
    expect(folderResource.createFolder).toHaveBeenCalledWith(mockFolderToCreate());
    expect(folder).toEqual(mockFolder())
  });
  it('should get a folder by id', async () => {
    const folderService = FolderService(folderResource);

    const folder = await folderService.getFolderById('inokuni');
    expect(folderResource.getFolderById).toHaveBeenCalledWith('inokuni');
    expect(folder).toEqual(mockFolder({id: 'inokuni'}))
  });

  it('should remove a folder by id', async () => {
    const folderService = FolderService(folderResource);
    await folderService.deleteFolderById('inokuni');
    expect(folderResource.deleteFolderById).toHaveBeenCalledWith('inokuni');
  });
});