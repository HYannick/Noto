import {useEffect, useState} from 'react';
import Header from '@/primary/common/Header.tsx';
import Search from '@/primary/common/Search.tsx';
import NoteList from '@/primary/note/NoteList.tsx';
import CreateEditNote from './CreateEditNote.tsx';
import IconButton from '@/primary/common/IconButton.tsx';
import styled from '@emotion/styled';
import {Note} from '@/domain/Note.ts';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {useSearchStore} from '@/primary/stores/search.store.ts';
import {useUserStore} from '@/primary/stores/user.store.ts';
import SideBar from '@/primary/common/SideBar.tsx';
import CategoryModal from '@/primary/category/CategoryModal.tsx';
import CategoryList from '@/primary/category/CategoryList.tsx';
import {useCategoriesStore} from '@/primary/stores/categories.store.ts';

export const IconAddButton = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  z-index: 5;
`

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  margin: 0 -1.5rem;
  z-index: 10;
  background: var(--color-light);
  padding: 0 1.5rem 1.5rem;
  border-bottom: 0.1rem solid var(--color-dark);
`


export default function HomeView() {
  const noteService = useInject('noteService');
  const userService = useInject('userService');
  const categoryService = useInject('categoryService');

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setNotes = useNoteStore(state => state.setNotes)
  const notes = useNoteStore(state => state.noteList)
  const {categoryModalOpen, openNoteEdit, createEditNoteOpen, sidebarOpen} = useAppStore()
  const setUserInfos = useUserStore(state => state.setUserInfos)
  const {setSelectedCategory, setCategories} = useCategoriesStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const fetchUser = async () => {
    try {
      const fetchedUser = await userService.getUserInfo();
      setUserInfos(fetchedUser);
    } catch (error) {
      setUserInfos({
        username: 'Stranger',
        avatar: null,
      });
    }
  }

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await noteService.getAllNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      setError('Error fetching notes. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await categoryService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      setError('Error fetching notes. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
    fetchUser();
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);


  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const result = notes.filter(note => note.title.toLowerCase().includes(query) || note.text.toLowerCase().includes(query))
    setFilteredNotes(result);
  }, [searchQuery]);

  const filterByCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategory('all');
      setFilteredNotes(notes);
      return;
    }
    setSelectedCategory(categoryId);
    setFilteredNotes(notes.filter(note => note.categories.includes(categoryId)))
  }

  return (
    <>
      <Header/>
      <StickyHeader>
        <Search/>
        <CategoryList onCategorySelected={filterByCategory}/>
      </StickyHeader>
      <NoteList loading={loading} error={error} notes={filteredNotes}/>
      <IconAddButton>
        <IconButton icon="add" onPress={openNoteEdit} backgroundColor="primary" color="light" shadowColor="primary-dark"/>
      </IconAddButton>
      {sidebarOpen && <SideBar/>}
      {createEditNoteOpen && <CreateEditNote onNoteUpdate={fetchNotes}/>}
      {categoryModalOpen &&
        <CategoryModal onCategoryUpdate={fetchCategories} onFilterByCategoryUpdate={filterByCategory}/>
      }
    </>
  )
}