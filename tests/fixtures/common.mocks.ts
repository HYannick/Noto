import {vi} from 'vitest';
import {INoteService} from '@/primary/note/NoteService.ts';
import {NoteResourceRepository} from '@/secondary/note/NoteResource.ts';
import {UserResourceRepository} from '@/secondary/user/UserResource.ts';
import {IUserService} from '@/primary/user/UserService.ts';
import {AppStoreState} from '@/primary/stores/app.store.ts';
import {UserStoreState} from '@/primary/stores/user.store.ts';
import {IContainer} from '@/domain/IContainer.ts';
import {NoteStoreState} from '@/primary/stores/note.store.ts';
import {CategoryResourceRepository} from '@/secondary/category/CategoryResource.ts';
import {ICategoryService} from '@/primary/category/CategoryService.ts';

export const mockAppStore = (opts?: Partial<AppStoreState>): AppStoreState => ({
  layout: 'grid',
  setLayout: vi.fn(),
  sidebarOpen: false,
  createEditNoteOpen: false,
  categoryModalOpen: false,
  openSidebar: vi.fn(),
  closeSidebar: vi.fn(),
  openNoteEdit: vi.fn(),
  closeNoteEdit: vi.fn(),
  openCategoryModal: vi.fn(),
  closeCategoryModal: vi.fn(),
  ...opts
});


export const mockNoteStore = (opts?: Partial<NoteStoreState>): NoteStoreState => ({
  currentNote: null,
  noteList: [],
  setCurrentNote: vi.fn(),
  setNotes: vi.fn(),
  ...opts
});

export const mockUserStore = (opts?: Partial<UserStoreState>): UserStoreState => ({
  username: '',
  avatar: null,
  setUserInfos: vi.fn(),
  ...opts
});

export const mockContainer = (opts?: Partial<IContainer>): IContainer => ({
  registry: {},
  resolve: vi.fn(),
  ...opts
});

export const mockNoteService = (opts?: Partial<INoteService>) => ({
  getAllNotes: vi.fn(),
  createNote: vi.fn(),
  updateNote: vi.fn(),
  deleteNoteById: vi.fn(),
  getNoteById: vi.fn(),
  ...opts,
}) as INoteService;

export const mockCategoryService = (opts?: Partial<ICategoryService>) => ({
  getAllCategory: vi.fn(),
  createCategory: vi.fn(),
  getCategoryById: vi.fn(),
  deleteCategoryById: vi.fn(),
  updateCategory: vi.fn(),
  deleteCategoriesById: vi.fn(),
  ...opts,
}) as CategoryResourceRepository;


export const mockedi18Next = {
  t: vi.fn()
}

export const mockNoteResource = (opts?: Partial<NoteResourceRepository>) => ({
  getAllNotes: vi.fn(),
  createNote: vi.fn(),
  getNoteById: vi.fn(),
  deleteNoteById: vi.fn(),
  updateNote: vi.fn(),
  bindCategory: vi.fn(),
  unbindCategoriesFromNotes: vi.fn(),
  ...opts,
}) as NoteResourceRepository;

export const mockCategoryResource = (opts?: Partial<CategoryResourceRepository>) => ({
  getAllCategory: vi.fn(),
  createCategory: vi.fn(),
  getCategoryById: vi.fn(),
  deleteCategoryById: vi.fn(),
  updateCategory: vi.fn(),
  ...opts,
}) as CategoryResourceRepository;


export const mockUserResource = (opts?: Partial<UserResourceRepository>): UserResourceRepository => ({
  getUserInfo: vi.fn(),
  saveUser: vi.fn(),
  ...opts
})


export const mockUserService = (opts?: Partial<IUserService>): IUserService => ({
  getUserInfo: vi.fn(),
  saveUser: vi.fn(),
  ...opts
})