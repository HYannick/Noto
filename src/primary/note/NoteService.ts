import {NoteResourceRepository} from '@/secondary/note/NoteResource.ts';
import {Note, NoteId, NoteToCreate} from '@/domain/Note.ts';

export interface INoteService {
  getAllNotes: () => Promise<Note[]>;
  createNote: (noteToCreate: NoteToCreate) =>  Promise<Note>;
  updateNote: (noteId: string, noteToUpdate: Note) => Promise<Note>;
  getNoteById: (noteId: string) => Promise<Note>;
  deleteNoteById: (noteId: string) => Promise<void>;
  bindCategory(categoryId: string, noteId: NoteId): Promise<Note>;
}

export const NoteService = (noteResource: NoteResourceRepository): INoteService => {
  const getAllNotes = async () => {
    return await noteResource.getAllNotes();
  }
  const createNote = async (noteToCreate: NoteToCreate) => {
    return await noteResource.createNote(noteToCreate);
  }

  const updateNote = async (noteId: NoteId, noteToUpdate: Note) => {
    return await noteResource.updateNote(noteId, noteToUpdate);
  }

  const getNoteById = async (noteId: NoteId): Promise<Note> =>  {
    return await noteResource.getNoteById(noteId);
  }
  const deleteNoteById = async (noteId: NoteId): Promise<void> =>  {
    await noteResource.deleteNoteById(noteId);
  }

  const bindCategory = async (categoryId: string, noteId: NoteId): Promise<Note> =>  {
    return await noteResource.bindCategory(categoryId, noteId);
  }

  return {
    getNoteById,
    getAllNotes,
    createNote,
    updateNote,
    deleteNoteById,
    bindCategory
  }
}