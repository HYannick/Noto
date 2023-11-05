export interface Note {
  id: string;
  title: string;
  date: Date;
  text: string;
  isFavourite: boolean;
}

export interface NoteToCreate {
  title: string;
  text: string;
}