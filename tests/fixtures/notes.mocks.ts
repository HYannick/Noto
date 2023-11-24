import {Note, NoteToCreate} from '@/domain/Note';

export const mockNote = (opts?: Partial<Note>): Note => ({
  id: 'vapor-note',
  title: 'Aesthetics is the new Genre',
  date: new Date(1995, 11, 23),
  isFavourite: false,
  text: 'Do so written as raising parlors spirits mr elderly. Made late in of high left hold. Carried females of up highest calling. Limits marked led silent dining her she far. Sir but elegance marriage dwelling likewise position old pleasure men.',
  categories: [],
  ...opts,
})

export const mockNoteToCreate = (opts?: Partial<NoteToCreate>): NoteToCreate => ({
  title: "Lena's Birthday Story",
  text: "Story time",
  categories: [],
  ...opts
})

export const dumbNotes = [
  {
    "id": "note1",
    "title": "Grocery List",
    "date": "2021-06-21",
    "text": "Apples, Bananas, Bread, Milk, Eggs, Chicken, Lettuce, Tomatoes, Pasta, Rice, Cheese, Yogurt, Coffee, Tea, Chocolate",
    "isFavourite": true,
    "categories": [
      "Shopping",
      "Food"
    ]
  },
  {
    "id": "note2",
    "title": "Meeting Notes",
    "date": "2022-02-10",
    "text": "Discuss project roadmap and deadlines. Review current progress on main objectives. Assign new tasks and responsibilities. Plan next meeting schedule. Address any concerns or issues.",
    "isFavourite": false,
    "categories": [
      "Work",
      "Meetings"
    ]
  },
  {
    "id": "note3",
    "title": "Book Recommendations",
    "date": "2020-10-07",
    "text": "The Alchemist - a journey of self-discovery, 1984 - a dystopian future, To Kill a Mockingbird - a classic tale of justice, The Great Gatsby - exploring the American dream, Harry Potter series - a magical adventure",
    "isFavourite": false,
    "categories": [
      "Books",
      "Leisure"
    ]
  },
  {
    "id": "note4",
    "title": "Travel Plan",
    "date": "2022-08-14",
    "text": "Visit Paris - Eiffel Tower and Louvre, London - Big Ben and the British Museum, and Rome - Colosseum and Vatican City in Summer 2023. Book hotels, flights, and local tours. Research local cuisine and cultural activities.",
    "isFavourite": true,
    "categories": [
      "Travel",
      "Vacation"
    ]
  }
]
