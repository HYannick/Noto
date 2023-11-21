import {useContainer} from './UseContainer.ts';
import {INoteService} from '@/primary/note/NoteService.ts';
import {IUserService} from '@/primary/user/UserService.ts';
import {ICategoryService} from '@/primary/category/CategoryService.ts';

export type RegistryKeys = 'noteService' | 'userService' | 'categoryService';
interface ServiceTypes {
  noteService: INoteService;
  userService: IUserService;
  categoryService: ICategoryService;
}
export const useInject = <K extends RegistryKeys>(identifier: K): ServiceTypes[K] => {
  const container = useContainer();
  return container.resolve(identifier);
}