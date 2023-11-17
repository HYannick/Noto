import {v4 as uuidv4} from 'uuid';
import {Folder, FolderToCreate} from '@/domain/Folder.ts';

export interface FolderResourceRepository {
  getAllFolders: () => Promise<Folder[]>;
  createFolder: (folderToCreate: FolderToCreate) => Promise<Folder>;
  updateFolder: (folderId: string, folderToUpdate: Folder) => Promise<Folder>;
  getFolderById: (folderId: string) => Promise<Folder>;
  deleteFolderById: (folderId: string) => Promise<Folder[]>;
}

const toFolder = (folderToCreate: FolderToCreate): Folder => ({
  id: uuidv4(),
  name: folderToCreate.name,
  notes: folderToCreate.notes,
})

export const FolderResource = (storage: LocalForage): FolderResourceRepository => {
  const getAllFolders = async (): Promise<Folder[]> => {
    try {
      const folders = await storage.getItem('folders') as Folder[];
      if(!folders) throw Error;
      return folders;
    } catch (e) {
      return []
    }
  }

  const createFolder = async (folderToCreate: FolderToCreate): Promise<Folder> => {
    const folders = await getAllFolders();
    const newFolder = toFolder(folderToCreate)
    await storage.setItem('folders', [...folders, newFolder]);
    return newFolder;
  }

  const updateFolder = async (folderId: string, folderToUpdate: Folder): Promise<Folder> => {
    const folders = await getAllFolders();
    const folderToUpdateIndex = folders.findIndex(folder => folder.id === folderId);
    folders[folderToUpdateIndex] = folderToUpdate;
    await storage.setItem('folders', folders);
    return folderToUpdate;
  }

  const getFolderById = async (folderId: string): Promise<Folder> => {
    const folders = await getAllFolders();
    return folders.find(folder => folder.id === folderId)!;
  }

  const deleteFolderById = async (folderId: string): Promise<Folder[]> => {
    const folders = await getAllFolders();
    const updatedNotes = folders.filter(folder => folder.id !== folderId);
    await storage.setItem('folders', updatedNotes);
    return updatedNotes;
  }


  return {
    getAllFolders,
    createFolder,
    updateFolder,
    getFolderById,
    deleteFolderById,
  }
}