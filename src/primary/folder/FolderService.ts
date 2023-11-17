import {FolderResourceRepository} from '@/secondary/folder/FolderResource.ts';
import {Folder, FolderToCreate} from '@/domain/Folder.ts';

export interface IFolderService {
  getAllFolders: () => Promise<Folder[]>;
  createFolder: (folderToCreate: FolderToCreate) =>  Promise<Folder>;
  updateFolder: (folderId: string, folderToUpdate: Folder) => Promise<Folder>;
  getFolderById: (folderId: string) => Promise<Folder>;
  deleteFolderById: (folderId: string) => Promise<void>;
}

export const FolderService = (folderResource: FolderResourceRepository): IFolderService => {
  const getAllFolders = async () => {
    return await folderResource.getAllFolders();
  }
  const createFolder = async (folderToCreate: FolderToCreate) => {
    return await folderResource.createFolder(folderToCreate);
  }

  const updateFolder = async (folderId: string, folderToUpdate: Folder) => {
    return await folderResource.updateFolder(folderId, folderToUpdate);
  }

  const getFolderById = async (folderId: string): Promise<Folder> =>  {
    return await folderResource.getFolderById(folderId);
  }
  const deleteFolderById = async (folderId: string): Promise<void> =>  {
    await folderResource.deleteFolderById(folderId);
  }

  return {
    getFolderById,
    getAllFolders,
    createFolder,
    updateFolder,
    deleteFolderById
  }
}