import {dumbNotes} from './notes.mocks';
import {dumbCategories} from './categories.mocks';
import localforage from 'localforage';

export const fillStorage = async () => {
  localforage.setItem('notes', dumbNotes);
  localforage.setItem('categories', dumbCategories);
}