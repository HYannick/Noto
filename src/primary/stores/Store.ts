import {StoreActionsTypes, StoreState} from './store.types.ts';

export const initialState: StoreState = {
  app: {
    sidebarOpen: false,
    createEditNoteOpen: false,
  },
  notes: {
    currentNote: null,
    noteList: [],
  },
  search: {
    searchQuery: '',
  }
}

const updateState = (key: 'app' | 'notes' | 'search', state: StoreState, payload: any) => ({
  ...state,
  [key]: {
    ...state[key],
    ...payload
  }
})


export type StoreAction = { type: StoreActionsTypes; payload?: any }
export const reducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case 'app/open-sidebar':
      return updateState('app', state, {sidebarOpen: true})
    case 'app/close-sidebar':
      return updateState('app', state, {sidebarOpen: false})
    case 'app/open-note':
      return updateState('app', state, {createEditNoteOpen: true})
    case 'app/close-note':
      return updateState('app', state, {createEditNoteOpen: false})
    case 'notes/set-current-note':
      return updateState('notes', state, {currentNote: action.payload})
    case 'notes/set-notes':
      return updateState('notes', state, {noteList: action.payload})
    case 'search/set-search-query':
      return updateState('search', state, {searchQuery: action.payload})
    default:
      return state;
  }
}