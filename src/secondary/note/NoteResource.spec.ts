import {expect, describe, vi, it, beforeEach} from 'vitest';
import {NoteResource} from './NoteResource.ts';
import {mockNote, mockNoteToCreate} from '@tests/fixtures/notes.mocks.ts';

let mockedDB: any;

vi
  .useFakeTimers()
  .setSystemTime(new Date('1995-12-22'));

vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('1')
}))

describe('NoteResource', () => {
  beforeEach(() => {
    mockedDB = {
      getItem: vi.fn().mockResolvedValue([
        mockNote(),
        mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic'}),
      ]),
      setItem: vi.fn().mockResolvedValue('OK')
    }
  })
  it('should get notes', async () => {
    const resource = NoteResource(mockedDB);
    const notes = await resource.getAllNotes();
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes')
    expect(notes).toEqual([
      mockNote(),
      mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic'}),
    ])
  });

  it('should return empty array if no notes', async () => {
    mockedDB.getItem = vi.fn().mockResolvedValue(null)
    const resource = NoteResource(mockedDB);
    const notes = await resource.getAllNotes();
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes')
    expect(notes).toEqual([])
  });

  it('should create a note', async () => {
    const resource = NoteResource(mockedDB);
    const noteToCreate = mockNoteToCreate();

    await resource.createNote(noteToCreate);
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes')
    expect(mockedDB.setItem).toHaveBeenCalledWith('notes', [
      mockNote(),
      mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic'}),
      {
        ...noteToCreate,
        id: '1',
        date: new Date(),
        isFavourite: false,
      }
    ])
  });

  it('should update a note', async () => {
    const resource = NoteResource(mockedDB);
    const noteToUpdate = mockNote({id: 'aesthetic-note', title: 'updated note'});

    await resource.updateNote('aesthetic-note', noteToUpdate);
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes')
    expect(mockedDB.setItem).toHaveBeenCalledWith('notes', [
      mockNote(),
      mockNote({id: 'aesthetic-note', title: 'updated note'}),
    ])
  });

  it('should get note by id', async () => {
    const resource = NoteResource(mockedDB);

    const note = await resource.getNoteById('aesthetic-note');
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes');
    expect(note).toEqual(mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic'}))
  });

  it('should delete a note', async () => {
    const resource = NoteResource(mockedDB);

    const notes = await resource.deleteNoteById('aesthetic-note');
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes');
    expect(notes).toEqual([
      mockNote()
    ])
  });
});