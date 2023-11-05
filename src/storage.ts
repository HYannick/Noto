import localforage from 'localforage';

export const initDB = () => {
  localforage.config({
    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name        : 'Nōto',
    version     : 1.0,
    storeName   : 'noto_db', // Should be alphanumeric, with underscores.
    description : 'Nōto database'
  });
  return localforage;
}