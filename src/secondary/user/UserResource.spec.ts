import {expect, describe, vi, it} from 'vitest';
import {UserResource} from './UserResource.ts';
import {mockNote} from '../../../tests/fixtures/notes.mocks.ts';

const mockedDB = {
  getItem: vi.fn().mockResolvedValue([
    mockNote(),
    mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic'}),
  ])
} as any

describe('UserResource', () => {
  it('should get user infos', async () => {
    const resource = UserResource(mockedDB);
    const notes = await resource.getAllNotes();
    expect(mockedDB.getItem).toHaveBeenCalledWith('notes')
    expect(notes).toEqual([
      mockNote(),
      mockNote({id: 'aesthetic-note', title: 'Genre is the new Aesthetic'}),
    ])
  });
});