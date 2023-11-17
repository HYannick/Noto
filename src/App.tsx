import './App.css'
import {initDB} from './storage.ts';
import HomeView from './views/HomeView.tsx';
import {useEffect} from 'react';
import {useTheme} from './domain/hooks/UseTheme.ts';
import {IContainer} from './domain/IContainer.ts';
import {NoteService} from './primary/note/NoteService.ts';
import {ContainerProvider} from './primary/common/ContainerProvider.tsx';
import {NoteResource} from './secondary/note/NoteResource.ts';
import localforage from 'localforage';
import {changeLanguage} from 'i18next';
import {UserService} from './primary/user/UserService.ts';
import {UserResource} from './secondary/user/UserResource.ts';
import {FolderService} from '@/primary/folder/FolderService.ts';
import {FolderResource} from '@/secondary/folder/FolderResource.ts';

const storage = initDB();

const noteResource = NoteResource(storage);
const userResource = UserResource(storage);
const folderResource = FolderResource(storage);

const container: IContainer = {
  registry: {
    noteService: NoteService(noteResource),
    userService: UserService(userResource),
    folderService: FolderService(folderResource),
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
  const getLanguage = async () => {
    let currentLang = await localforage.getItem('currentLang') as string;
    if (!currentLang) {
      currentLang = 'en';
      await localforage.setItem('currentLang', currentLang);
    }
    changeLanguage(currentLang);
  }
  useEffect(() => {
    setTheme();
    getLanguage();
  }, [])


  return (
    <ContainerProvider container={container}>
      <HomeView/>
    </ContainerProvider>
  )
}

export default App
