import {expect, describe, vi, it} from 'vitest';
import {UserResource} from '../UserResource.ts';
import {User, UserToSave} from '../../../domain/User.ts';

export const mockUser = (opts?: Partial<User>): User => ({
  username: 'Lena',
  avatar: null,
  ...opts
})
const mockedDB = {
  getItem: vi.fn().mockResolvedValue(mockUser()),
  setItem: vi.fn().mockResolvedValue(mockUser())
} as any

describe('UserResource', () => {
  it('should get user infos', async () => {
    const resource = UserResource(mockedDB);
    const user = await resource.getUserInfo();
    expect(mockedDB.getItem).toHaveBeenCalledWith('user')
    expect(user).toEqual(mockUser())
  });

  it('should set user infos', async () => {
    const mockedUserToSave: UserToSave = {
      username: 'Kristin',
      avatar: null,
    }
    const resource = UserResource(mockedDB);
    const user = await resource.saveUser(mockedUserToSave);
    expect(mockedDB.setItem).toHaveBeenCalledWith('user', mockedUserToSave)
    expect(user).toEqual(mockUser({
      username: 'Kristin',
      avatar: null
    }))
  });
});