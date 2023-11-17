import { expect, describe, vi, it } from 'vitest';
import {NoteService} from '@/primary/note/NoteService.ts';
import {mockNote, mockNoteToCreate} from '@tests/fixtures/notes.mocks.ts';
import {mockNoteResource} from '@tests/fixtures/common.mocks.ts';

const noteResource = mockNoteResource({
  getAllNotes: vi.fn().mockResolvedValue([mockNote()]),
  createNote: vi.fn().mockResolvedValue(mockNote()),
  getNoteById: vi.fn().mockResolvedValue(mockNote({id: 'inokuni'})),
  deleteNoteById: vi.fn().mockResolvedValue([mockNote({id: 'inokuni'})])
})
describe('NoteService', () => {
  it('should get all notes', async () => {
    const noteService = NoteService(noteResource);
    const notes = await noteService.getAllNotes();
    expect(noteResource.getAllNotes).toHaveBeenCalled()
    expect(notes).toEqual([mockNote()])
  });
  it('should create a note', async () => {
    const noteService = NoteService(noteResource);

    const note = await noteService.createNote(mockNoteToCreate());
    expect(noteResource.createNote).toHaveBeenCalledWith(mockNoteToCreate());
    expect(note).toEqual(mockNote())
  });
  it('should get a note by id', async () => {
    const noteService = NoteService(noteResource);

    const note = await noteService.getNoteById('inokuni');
    expect(noteResource.getNoteById).toHaveBeenCalledWith('inokuni');
    expect(note).toEqual(mockNote({id: 'inokuni'}))
  });

  it('should remove a note by id', async () => {
    const noteService = NoteService(noteResource);
    await noteService.deleteNoteById('inokuni');
    expect(noteResource.deleteNoteById).toHaveBeenCalledWith('inokuni');
  });
});