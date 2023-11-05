import {useContext} from 'react';
import Header from '../primary/common/Header.tsx';
import Search from '../primary/common/Search.tsx';
import NoteList from '../primary/note/NoteList.tsx';
import CreateEditNote from './CreateEditNote.tsx';
import AppContext, {AppContextValues} from '../primary/common/contexts/AppContext.ts';
import IconButton from '../primary/common/IconButton.tsx';
import styled from '@emotion/styled';
import {NoteProvider} from '../primary/common/providers/NoteProvider.tsx';

export const IconAddButton = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  z-index: 5;
`


export default function HomeView() {
  const {setCreateEditNoteState} = useContext(AppContext) as AppContextValues;
  return (
    <>
      <Header/>
      <NoteProvider>
        <Search/>
        <NoteList/>
        <IconAddButton>
          <IconButton icon="add" onPress={() => setCreateEditNoteState(true)} backgroundColor="primary" color="light"/>
        </IconAddButton>
        <CreateEditNote/>
      </NoteProvider>
    </>
  )
}