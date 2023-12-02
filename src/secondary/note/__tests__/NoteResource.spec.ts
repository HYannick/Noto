import {expect, describe, vi, it, beforeEach} from 'vitest';
import {NoteResource} from '../NoteResource.ts';
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

  it('should bind a category to a note', async () => {
    const resource = NoteResource(mockedDB);

    const note = await resource.bindCategory('dreams', 'aesthetic-note');
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes');
    expect(mockedDB.setItem).toHaveBeenCalledWith('notes', [
      mockNote(),
      mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic', categories: ['dreams']})
    ])
    expect(note.categories).toEqual(['dreams'])
  });

  it('should unbind a category to a note if exist', async () => {
    const resource = NoteResource(mockedDB);

    await resource.bindCategory('dreams', 'aesthetic-note');
    await resource.bindCategory('memories', 'aesthetic-note');
    const note = await resource.bindCategory('dreams', 'aesthetic-note');
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes');
    expect(mockedDB.setItem).toHaveBeenCalledWith('notes', [
      mockNote(),
      mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic', categories: ['memories']})
    ])
    expect(note.categories).toEqual(['memories'])
  });

  it('should unbind categories set from notes', async () => {
    mockedDB = {
      getItem: vi.fn().mockResolvedValue([
        mockNote({
          id: '1',
          categories: ['aesthetic-Category', 'origami']
        }),
        mockNote({
          id: '1',
          categories: ['tokyo-Category', 'aesthetic-Category', 'random-cat']
        })
      ]),
      setItem: vi.fn().mockResolvedValue('OK')
    }
    const resource = NoteResource(mockedDB);

    await resource.unbindCategoriesFromNotes(['tokyo-Category', 'random-cat', 'origami']);
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes');
    expect(mockedDB.setItem).toHaveBeenCalledWith('notes', [
      mockNote({
        id: '1',
        categories: ['aesthetic-Category']
      }),
      mockNote({
        id: '1',
        categories: ['aesthetic-Category']
      })
    ])
  });

  it('should delete notes by id', async () => {
    mockedDB = {
      getItem: vi.fn().mockResolvedValue([
        mockNote({
          id: '1',
        }),
        mockNote({
          id: '2'
        }),
        mockNote({
          id: '3',
        })
      ]),
      setItem: vi.fn().mockResolvedValue('OK')
    }
    const resource = NoteResource(mockedDB);

    await resource.deleteNotesById(['1', '3']);
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes');
    expect(mockedDB.setItem).toHaveBeenCalledWith('notes', [
      mockNote({
        id: '2',
      })
    ])
  });
});