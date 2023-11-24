import {create} from 'zustand';

export interface AppStoreState {
  sidebarOpen: boolean,
  createEditNoteOpen: boolean,
  categoryModalOpen: boolean,
  layout: 'grid' | 'list',
  setLayout(layout: 'grid' | 'list'): void,
  openCategoryModal: () => void,
  closeCategoryModal: () => void,
  openSidebar: () => void,
  closeSidebar: () => void,
  openNoteEdit: () => void,
  closeNoteEdit: () => void,
}

export const useAppStore = create<AppStoreState>((set) => ({
  sidebarOpen: false,
  createEditNoteOpen: false,
  categoryModalOpen: false,
  layout: 'grid',
  setLayout: (layout) => set(() => ({layout})),
  openCategoryModal: () => set(() => ({categoryModalOpen: true})),
  closeCategoryModal: () => set(() => ({categoryModalOpen: false})),
  openSidebar: () => set(() => ({sidebarOpen: true})),
  closeSidebar: () => set(() => ({sidebarOpen: false})),
  openNoteEdit: () => set(() => ({createEditNoteOpen: true})),
  closeNoteEdit: () => set(() => ({createEditNoteOpen: false})),
}))