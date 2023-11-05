import {Note, NoteToCreate} from '../../src/domain/Note';

export const mockNote = (opts?: Partial<Note>): Note => ({
  id: 'vapor-note',
  title: 'Aesthetics is the new Genre',
  date: new Date(1995, 11, 23),
  isFavourite: false,
  text: 'Do so written as raising parlors spirits mr elderly. Made late in of high left hold. Carried females of up highest calling. Limits marked led silent dining her she far. Sir but elegance marriage dwelling likewise position old pleasure men.',
  ...opts,
})

export const mockNoteToCreate = (opts?: Partial<NoteToCreate>): NoteToCreate => ({
  title: "Lena's Birthday Story",
  text: "Story time",
  ...opts
})