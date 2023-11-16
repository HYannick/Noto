import {ImageBlob} from './ImageBlob.ts';

export interface User {
  username: string;
  avatar: ImageBlob;
}

export interface UserToSave {
  username: string;
  avatar: ImageBlob;
}