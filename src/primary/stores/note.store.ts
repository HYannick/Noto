import {create} from 'zustand';
import {Note} from '../../domain/Note.ts';

interface NoteStoreState {
  currentNote: Note | null;
  noteList: Note[],
  setCurrentNote: (note: Note | null) => void,
  setNotes: (notes: Note[]) => void,
}

export const useNoteStore = create<NoteStoreState>((set) => ({
  currentNote: null,
  noteList: [],
  setCurrentNote: (note: Note | null) => set({currentNote: note}),
  setNotes: (notes: Note[]) => set({noteList: notes}),
}))