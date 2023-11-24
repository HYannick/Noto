import {useEffect, useState} from 'react';
import Header from '@/primary/common/Header.tsx';
import Search from '@/primary/common/Search.tsx';
import NoteList from '@/primary/note/NoteList.tsx';
import CreateEditNoteView from '../create-edit-note/CreateEditNoteView.tsx';
import IconButton from '@/primary/common/buttons/IconButton.tsx';
import {Note} from '@/domain/Note.ts';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {useSearchStore} from '@/primary/stores/search.store.ts';
import {useUserStore} from '@/primary/stores/user.store.ts';
import SettingsDrawer from '@/primary/common/drawers/SettingsDrawer.tsx';
import CategoryModal from '@/primary/category/CategoryModal.tsx';
import CategoryList from '@/primary/category/CategoryList.tsx';
import {useCategoriesStore} from '@/primary/stores/categories.store.ts';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import {IconAddButton, StickyHeader} from '@/primary/views/home/HomeView.styled.tsx';




export default function HomeView() {
  const noteService = useInject('noteService');
  const userService = useInject('userService');
  const categoryService = useInject('categoryService');

  const {searchQuery} = useSearchStore();
  const {noteList: notes, setNotes} = useNoteStore()
  const {categoryModalOpen, openNoteEdit, createEditNoteOpen, sidebarOpen} = useAppStore()
  const {setUserInfos} = useUserStore()
  const {setSelectedCategory, setCategories} = useCategoriesStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [ref, entry] = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: "0px",
  });
  const isHeaderPinned = entry ? entry.intersectionRatio < 1 : false;
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

  const performSearch = () => {
    const query = searchQuery.toLowerCase();
    const result = notes.filter(note => note.title.toLowerCase().includes(query) || note.text.toLowerCase().includes(query))
    setFilteredNotes(result);
  }

  const filterByCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategory('all');
      setFilteredNotes(notes);
      return;
    }
    setSelectedCategory(categoryId);
    setFilteredNotes(notes.filter(note => note.categories.includes(categoryId)))
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
    performSearch();
  }, [searchQuery]);

  return (
    <>
      <Header/>
      <StickyHeader ref={ref} isPinned={isHeaderPinned}>
        <Search/>
        <CategoryList onCategorySelected={filterByCategory}/>
      </StickyHeader>
      <NoteList loading={loading} error={error} notes={filteredNotes}/>
      <IconAddButton>
        <IconButton icon="add" onPress={openNoteEdit} backgroundColor="primary" color="light" shadowColor="primary-dark"/>
      </IconAddButton>
      {sidebarOpen && <SettingsDrawer/>}
      {createEditNoteOpen && <CreateEditNoteView onNoteUpdate={fetchNotes}/>}
      {categoryModalOpen &&
        <CategoryModal onCategoryUpdate={fetchCategories} onFilterByCategoryUpdate={filterByCategory}/>
      }
    </>
  )
}