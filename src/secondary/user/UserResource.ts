import {User, UserToSave} from '../../domain/User.ts';

export interface UserResourceRepository {
  getUserInfo: () => Promise<User>;
  saveUser: (userToSave: UserToSave) => Promise<User>
}

export const UserResource = (storage: LocalForage): UserResourceRepository => {
  const getUserInfo = async (): Promise<User> => {
    try {
      const user = await storage.getItem('user') as User;
      if(!user) throw Error;
      return user;
    } catch (e) {
      throw Error;
    }
  }

  const saveUser = async (userToSave: UserToSave): Promise<User> => {
    try {
      await storage.setItem('user', userToSave) as User;
      return userToSave;
    } catch (e) {
      throw Error;
    }
  }

  return {
    getUserInfo,
    saveUser,
  }
}