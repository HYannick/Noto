import {Note} from '../../domain/Note.ts';
import {Dispatch} from 'react';
import {StoreAction} from './Store.ts';

export type StoreState = {
  app: {
    sidebarOpen: boolean,
    createEditNoteOpen: boolean,
  },
  notes: {
    currentNote: Note | null;
    noteList: Note[],
  }
  search: {
    searchQuery: string;
  }
}

export type StoreActionsTypes =
  'app/open-sidebar'
  | 'app/close-sidebar'
  | 'app/open-note'
  | 'app/close-note'
  | 'notes/set-current-note'
  | 'notes/set-notes'
  | 'search/set-search-query';

export type StoreContextValues = {
  state: StoreState,
  dispatch: Dispatch<StoreAction>,
  // actions: {
  //   openSidebar: () => void,
  //   closeSidebar: () => void,
  //   openNoteEdit: () => void,
  //   closeNoteEdit: () => void,
  //   setNotes: () => void,
  //   setCurrentNote: () => void,
  //   setSearchQuery: () => void,
  // }
}