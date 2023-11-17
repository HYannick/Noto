export type NoteId = string;
export interface Note {
  id: NoteId;
  title: string;
  date: Date;
  text: string;
  isFavourite: boolean;
}

export interface NoteToCreate {
  title: string;
  text: string;
}