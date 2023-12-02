import {createContext, useCallback, useState} from 'react';
import {Note} from '@/domain/Note.ts';

export const SelectionContext = createContext({
  selectMode: false,
  setSelectMode: (selectMode: boolean) => selectMode,
  selectedNotes: [] as Note[],
  setSelectedNotes: (notes: Note[]) => notes,
  actionBarOpen: false,
  setActionBarOpen: (actionBarOpen: boolean) => actionBarOpen,
  initSelectMode: (note: Note) => note,
  resetSelectMode: () => {},
});

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