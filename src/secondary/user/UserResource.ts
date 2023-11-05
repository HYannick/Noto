import {Note} from '../../domain/Note.ts';

export interface NoteResourceRepository {
  getAllNotes: () => Promise<Note[]>
}

export const UserResource = (storage: LocalForage): NoteResourceRepository => {
  const getAllNotes = async (): Promise<Note[]> => {
    try {
      const notes = await storage.getItem('notes') as Note[];
      if(!notes) throw Error;
      return notes;
    } catch (e) {
      return []
    }
  }
  return {
    getAllNotes
  }
}