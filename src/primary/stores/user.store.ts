import {create} from 'zustand';
import {User} from '../../domain/User.ts';
interface UserStoreState {
  username: string;
  avatar: string;
  setUserInfos: (userInfos: User) => void
}
export const useUserStore = create<UserStoreState>((set) => ({
  username: '',
  avatar: '',
  setUserInfos: (userInfos: User) => set({username: userInfos.username, avatar: userInfos.avatar})
}))