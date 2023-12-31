import {Note, NoteId, NoteToCreate} from '@/domain/Note.ts';
import {v4 as uuidv4} from 'uuid';

export interface NoteResourceRepository {
  getAllNotes: () => Promise<Note[]>;
  createNote: (noteToCreate: NoteToCreate) => Promise<Note>;
  updateNote: (noteId: NoteId, noteToUpdate: Note) => Promise<Note>;
  getNoteById: (noteId: NoteId) => Promise<Note>;
  deleteNoteById: (noteId: NoteId) => Promise<Note[]>;
  deleteNotesById: (noteIds: NoteId[]) => Promise<Note[]>;
  bindCategory: (categoryId: string, noteId: NoteId) => Promise<Note>;
  unbindCategoriesFromNotes: (categoryIds: string[]) => Promise<Note[]>;
}

const toNote = (noteToCreate: NoteToCreate) => ({
  id: uuidv4(),
  date: new Date(),
  isFavourite: false,
  title: noteToCreate.title,
  text: noteToCreate.text,
  categories: noteToCreate.categories || [],
})

export const NoteResource = (storage: LocalForage): NoteResourceRepository => {
  const getAllNotes = async (): Promise<Note[]> => {
    try {
      const notes = await storage.getItem('notes') as Note[];
      if(!notes) throw Error;
      return notes;
    } catch (e) {
      return []
    }
  }

  const createNote = async (noteToCreate: NoteToCreate): Promise<Note> => {
    const notes = await getAllNotes();
    const newNote = toNote(noteToCreate)
    await storage.setItem('notes', [...notes, newNote])
    return newNote;
  }

  const updateNote = async (noteId: string, noteToUpdate: Note): Promise<Note> => {
    const notes = await getAllNotes();
    const noteToUpdateIndex = notes.findIndex(note => note.id === noteId);
    notes[noteToUpdateIndex] = {...noteToUpdate, categories: noteToUpdate.categories || []};
    await storage.setItem('notes', notes);
    return noteToUpdate;
  }

  const getNoteById = async (noteId: string): Promise<Note> => {
    const notes = await getAllNotes();
    return notes.find(note => note.id === noteId)!;
  }

  const deleteNoteById = async (noteId: string): Promise<Note[]> => {
    const notes = await getAllNotes();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    await storage.setItem('notes', updatedNotes);
    return updatedNotes;
  }

  const bindCategory = async (categoryId: string, noteId: string): Promise<Note> => {
    const note = await getNoteById(noteId);
    let categories = note.categories;
    if (categories.includes(categoryId)) {
      categories = note.categories.filter(category => category !== categoryId);
    } else {
      categories = [...note.categories, categoryId];
    }
    return await updateNote(noteId, {...note, categories})
  }

  const unbindCategoriesFromNotes = async (categoryIds: string[]): Promise<Note[]> =>{
    const notes = await getAllNotes();
    const categoryIdSet = new Set(categoryIds);

    const updatedNotes = notes.map(note => {
      const updatedCategories = note.categories.filter(category => !categoryIdSet.has(category));
      return { ...note, categories: updatedCategories };
    });
    await storage.setItem('notes', updatedNotes);
    return updatedNotes;
  }

  const deleteNotesById = async (noteIds: string[]): Promise<Note[]> => {
    const notes = await getAllNotes();
    const noteIdSet = new Set(noteIds);
    const filteredNotes = notes.filter(note => !noteIdSet.has(note.id));
    await storage.setItem('notes', filteredNotes);
    return filteredNotes;
  }

  return {
    getAllNotes,
    createNote,
    updateNote,
    getNoteById,
    deleteNoteById,
    bindCategory,
    unbindCategoriesFromNotes,
    deleteNotesById
  }
}