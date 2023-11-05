import {ReactElement, useState} from 'react';
import {Note} from '../../../domain/Note.ts';
import NoteContext from '../contexts/NoteContext.ts';

export const NoteProvider = ({children}: {children: ReactElement[]}) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  return (
    <NoteContext.Provider value={{notes, currentNote, setNotes, setCurrentNote}}>
      {children}
    </NoteContext.Provider>
  )
}