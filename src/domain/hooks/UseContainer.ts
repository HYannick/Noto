import {useContext} from 'react';
import {ContainerContext} from '../../primary/common/ContainerProvider.tsx';
import {IContainer} from '../IContainer.ts';

export const useContainer = (): IContainer => {
  const container = useContext(ContainerContext)
  if(!container)  throw new Error('Container not found. Make sure to wrap your components with a ContainerProvider.');

  return container;
}