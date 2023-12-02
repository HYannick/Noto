import {createContext, useCallback, useState} from 'react';
import {Note} from '@/domain/Note.ts';

const defaultValues = {
  selectMode: false,
  setSelectMode: (_selectMode: boolean) => {},
  selectedNotes: [] as Note[],
  setSelectedNotes: (_notes: Note[]) => {},
  actionBarOpen: false,
  setActionBarOpen: (_actionBarOpen: boolean) => {},
  initSelectMode: (_note: Note) => {},
  resetSelectMode: () => {},
}

export const SelectionContext = createContext(defaultValues);

export const SelectionContextProvider = ({children}: { children: any }) => {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [actionBarOpen, setActionBarOpen] = useState(false);

  const initSelectMode = useCallback((note: Note) => {
    setSelectMode(true);
    setActionBarOpen(true);
    setSelectedNotes([...selectedNotes, note]);
  }, []);

  const resetSelectMode = useCallback(() => {
    setSelectMode(false);
    setActionBarOpen(false);
    setSelectedNotes([]);
  }, []);

  return (
    <SelectionContext.Provider
      value={{selectMode, setSelectMode, selectedNotes, setSelectedNotes, actionBarOpen, setActionBarOpen, initSelectMode, resetSelectMode}}>
      {children}
    </SelectionContext.Provider>
  )
}