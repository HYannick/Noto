import '@assets/style/App.css'
import {initDB} from '../storage.ts';
import HomeView from '@/primary/views/home/HomeView.tsx';
import {useEffect} from 'react';
import {useTheme} from '../domain/hooks/UseTheme.ts';
import {IContainer} from '../domain/IContainer.ts';
import {NoteService} from './note/NoteService.ts';
import {ContainerProvider} from './common/ContainerProvider.tsx';
import {NoteResource} from '../secondary/note/NoteResource.ts';
import localforage from 'localforage';
import {changeLanguage} from 'i18next';
import {UserService} from './user/UserService.ts';
import {UserResource} from '../secondary/user/UserResource.ts';
import {CategoryService} from '@/primary/category/CategoryService.ts';
import {CategoryResource} from '@/secondary/category/CategoryResource.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';

const storage = initDB();

const noteResource = NoteResource(storage);
const userResource = UserResource(storage);
const categoryResource = CategoryResource(storage);


const container: IContainer = {
  registry: {
    noteService: NoteService(noteResource),
    userService: UserService(userResource),
    categoryService: CategoryService(categoryResource),
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
  const {setLayout} = useAppStore();
  const getLanguage = async () => {
    let currentLang = await localforage.getItem('currentLang') as string;
    if (!currentLang) {
      currentLang = 'en';
      await localforage.setItem('currentLang', currentLang);
    }
    changeLanguage(currentLang);
  }

  const getLayout = async () => {
    let currentLayout = await localforage.getItem('currentLayout') as 'grid' | 'list';
    if (!currentLayout) {
      currentLayout = 'grid';
      await localforage.setItem('currentLayout', currentLayout);
    }
    setLayout(currentLayout);
  }
  useEffect(() => {
    setTheme();
    getLanguage();
    getLayout();
    // fillStorage();
  }, [])


  return (
    <ContainerProvider container={container}>
      <HomeView/>
    </ContainerProvider>
  )
}

export default App
