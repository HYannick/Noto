import {User, UserToSave} from '@/domain/User.ts';
import {UserResourceRepository} from '@/secondary/user/UserResource.ts';

export interface IUserService {
  getUserInfo: () => Promise<User>;
  saveUser: (useToSave: UserToSave) =>  Promise<User>;
}

export const UserService = (userResource: UserResourceRepository): IUserService => {
  const getUserInfo = async () => {
    return await userResource.getUserInfo();
  }
  const saveUser = async (userToSave: UserToSave) => {
    return await userResource.saveUser(userToSave);
  }

  return {
    getUserInfo,
    saveUser,
  }
}