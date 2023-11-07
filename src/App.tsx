import './App.css'
import {initDB} from './storage.ts';
import HomeView from './views/HomeView.tsx';
import {useEffect} from 'react';
import {useTheme} from './domain/hooks/UseTheme.ts';
import {IContainer} from './domain/IContainer.ts';
import {NoteService} from './primary/note/NoteService.tsx';
import {ContainerProvider} from './primary/common/ContainerProvider.tsx';
import {NoteResource} from './secondary/note/NoteResource.ts';

const storage = initDB();

const noteResource = NoteResource(storage);
const container: IContainer = {
  registry: {
    noteService: NoteService(noteResource)
  },
  resolve(identifier: string) {
    if (!this.registry.hasOwnProperty(identifier)) {
      throw new Error(`Object with identifier ${identifier} not found in container`);
    }
    return this.registry[identifier];
  }
}

function App() {
  const {setTheme} = useTheme();
  useEffect(() => {
    setTheme();
  }, [])
  return (
    <ContainerProvider container={container}>
      <HomeView/>
    </ContainerProvider>
  )
}

export default App
