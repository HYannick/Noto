import {vi} from 'vitest';
import {INoteService} from '../../src/primary/note/NoteService.tsx';
import {NoteResourceRepository} from '../../src/secondary/note/NoteResource.ts';
import {UserResourceRepository} from '../../src/secondary/user/UserResource.ts';
import {IUserService} from '../../src/primary/user/UserService.ts';

// export const mockAppContextValues = (opts?: Partial<AppContextValues>) => ({
//   createEditNoteOpen: false,
//   setCreateEditNoteState: vi.fn(),
//   sidebarState: {
//     sidebarOpen: false,
//   },
//   setSidebarState: vi.fn(),
//   ...opts,
// }) as AppContextValues;
//
// export const mockNoteContextValues = (opts?: Partial<NoteContextValues>) => ({
//   currentNote: null,
//   setCurrentNote: vi.fn(),
//   notes: [],
//   setNotes: vi.fn(),
//   ...opts,
// }) as NoteContextValues;

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