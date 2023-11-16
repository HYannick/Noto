import {useContainer} from './UseContainer.ts';

export type RegistryKeys = 'noteService' | 'userService';
export const useInject = (identifier: RegistryKeys) => {
  const container = useContainer();
  return container.resolve(identifier);
}