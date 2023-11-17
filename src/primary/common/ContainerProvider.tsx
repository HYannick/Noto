import {createContext} from 'react';
import {IContainer} from '@/domain/IContainer.ts';

export const ContainerContext = createContext(null);

export const ContainerProvider = ({container, children}: {container: IContainer, children: any}) => {
  return (
    <ContainerContext.Provider value={container as any}>
      {children}
    </ContainerContext.Provider>
  )
}
