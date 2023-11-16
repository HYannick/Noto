import { expect, describe, vi, it } from 'vitest';
import {mockUserResource} from '../../../tests/fixtures/common.mocks.ts';
import {mockUser} from '../../secondary/user/__tests__/UserResource.spec.ts';
import {UserService} from './UserService.ts';

const userResource = mockUserResource({
  getUserInfo: vi.fn().mockResolvedValue(mockUser()),
  saveUser: vi.fn().mockResolvedValue(mockUser()),
})
describe('UserService', () => {
  it('should get user infos', async () => {
    const userService = UserService(userResource);
    const user = await userService.getUserInfo();
    expect(userResource.getUserInfo).toHaveBeenCalled()
    expect(user).toEqual(mockUser())
  });
  it('should create a note', async () => {
    const userService = UserService(userResource);
    const user = await userService.saveUser({username: 'Kristin', avatar: 'ortega.jpg'});
    expect(userResource.saveUser).toHaveBeenCalledWith({name: 'Kristin', avatar: 'ortega.jpg'});
    expect(user).toEqual(mockUser())
  });
});