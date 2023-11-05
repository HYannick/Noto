import {createContext, Dispatch, SetStateAction} from 'react';

export interface AppContextValues {
  sidebarOpen: boolean,
  createEditNoteOpen: boolean,
  setSidebarState: Dispatch<SetStateAction<boolean>>
  setCreateEditNoteState: Dispatch<SetStateAction<boolean>>
}

export const appDefaultState = {
  sidebarOpen: false,
  createEditNoteOpen: false,
  setSidebarState: () => {},
  setCreateEditNoteState: () => {}
}

const AppContext = createContext<AppContextValues>(appDefaultState);

export default AppContext;