import {useContainer} from './UseContainer.ts';

export type RegistryKeys = 'noteService'
export const useInject = (identifier: RegistryKeys) => {
  const container = useContainer();
  return container.resolve(identifier);
}