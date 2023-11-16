import {create} from 'zustand';
import {User} from '../../domain/User.ts';
import {ImageBlob} from '../../domain/ImageBlob.ts';
interface UserStoreState {
  username: string;
  avatar: ImageBlob;
  setUserInfos: (userInfos: User) => void
}
export const useUserStore = create<UserStoreState>((set) => ({
  username: '',
  avatar: null,
  setUserInfos: (userInfos: User) => set({username: userInfos.username, avatar: userInfos.avatar})
}))