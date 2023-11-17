import {Note} from '@/domain/Note.ts';

export interface Folder {
  id: string;
  name: string;
  notes: Note[];
}
export interface FolderToCreate {
  name: string;
  notes: Note[];
}