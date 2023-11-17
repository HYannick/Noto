import {Folder, FolderToCreate} from '@/domain/Folder.ts';
import {mockNote} from './notes.mocks';

export const mockFolder = (opts?: Partial<Folder>): Folder => ({
  id: 'vapor-folder',
  name: 'Vaporwave',
  notes: [mockNote()],
  ...opts,
})

export const mockFolderToCreate = (opts?: Partial<FolderToCreate>): FolderToCreate => ({
  name: 'New Vaporwave Folder',
  notes: [mockNote()],
  ...opts,
})