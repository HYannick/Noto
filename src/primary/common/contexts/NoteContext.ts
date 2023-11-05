import React, { createContext } from 'react';
import {Note} from '../../../domain/Note.ts';

export interface NoteContextValues {
  currentNote: Note | null;
  notes: Note[],
  setCurrentNote: React.Dispatch<React.SetStateAction<Note | null>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const defaultValues = {
  currentNote: null,
  notes: [],
  setCurrentNote: () => {},
  setNotes: () => [],
}

const NoteContext = createContext<NoteContextValues>(defaultValues);

export default NoteContext;