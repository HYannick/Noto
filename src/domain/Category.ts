import {Note} from '@/domain/Note.ts';

export interface Category {
  id: string;
  name: string;
  notes: Note[];
}
export interface CategoryToCreate {
  name: string;
  notes: Note[];
}