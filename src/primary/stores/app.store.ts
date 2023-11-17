import {create} from 'zustand';

export interface AppStoreState {
  sidebarOpen: boolean,
  createEditNoteOpen: boolean,
  openSidebar: () => void,
  closeSidebar: () => void,
  openNoteEdit: () => void,
  closeNoteEdit: () => void,
}

export const useAppStore = create<AppStoreState>((set) => ({
  sidebarOpen: false,
  createEditNoteOpen: false,
  openSidebar: () => set(() => ({sidebarOpen: true})),
  closeSidebar: () => set(() => ({sidebarOpen: false})),
  openNoteEdit: () => set(() => ({createEditNoteOpen: true})),
  closeNoteEdit: () => set(() => ({createEditNoteOpen: false})),
}))