import {vi} from 'vitest';
import {INoteService} from '../../src/primary/note/NoteService.tsx';
import {NoteResourceRepository} from '../../src/secondary/note/NoteResource.ts';

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