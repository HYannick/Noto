import {vi} from 'vitest';
import {INoteService} from '@/primary/note/NoteService.tsx';
import {NoteResourceRepository} from '@/secondary/note/NoteResource.ts';
import {UserResourceRepository} from '@/secondary/user/UserResource.ts';
import {IUserService} from '@/primary/user/UserService.ts';
import {AppStoreState} from '@/primary/stores/app.store.ts';
import {UserStoreState} from '@/primary/stores/user.store.ts';
import {IContainer} from '@/domain/IContainer.ts';
import {NoteStoreState} from '@/primary/stores/note.store.ts';

export const mockAppStore = (opts?: Partial<AppStoreState>): AppStoreState => ({
  sidebarOpen: false,
  createEditNoteOpen: false,
  openSidebar: vi.fn(),
  closeSidebar: vi.fn(),
  openNoteEdit: vi.fn(),
  closeNoteEdit: vi.fn(),
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
  createNote: vi.fn(),
  updateNote: vi.fn(),
  deleteNoteById: vi.fn(),
  getNoteById: vi.fn(),
  ...opts,
}) as INoteService;


export const mockedi18Next = {
  t: vi.fn()
}

export const mockNoteResource = (opts?: Partial<NoteResourceRepository>) => ({
  getAllNotes: vi.fn(),
  createNote: vi.fn(),
  getNoteById: vi.fn(),
  deleteNoteById: vi.fn(),
  updateNote: vi.fn(),
  ...opts,
}) as NoteResourceRepository;


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