import {NoteCard} from './NoteCard.tsx';
import styled from '@emotion/styled';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {Note, NoteId} from '@/domain/Note.ts';
import {createPortal} from 'react-dom';
import {ActionModal} from '@/primary/category/ActionModal.tsx';
import ConfirmModal from '@/primary/common/ConfirmModal.tsx';
import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {IconName} from '@assets/svg/icons';
import {SelectionContext} from '@/primary/views/home/SelectionContextProvider.tsx';

export const NoteContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props: { layout: 'grid' | 'list' }) => props.layout === 'list' ? '1fr' : '1fr 1fr'};
  gap: 1.5rem;
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1366px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
export const NoteSection = styled.div`
  flex: 1;
  height: 100%;
  background: var(--color-background);
  border-radius: 1.5rem 1.5rem 0 0 ;
  padding: 2.5rem 1.5rem;
  margin: 0 -1.5rem -1.5rem;
  border: 0.1rem solid var(--color-dark);
  @media screen and (min-width: 1024px) {
    border-radius: 1rem 1rem 0 0;
  }
`

export default function NoteList({loading, error, notes, onNoteListUpdate}: any) {
  const {t} = useTranslation();
  const noteService = useInject('noteService');
  const {setCurrentNote} = useNoteStore((state) => state);
  const {openNoteEdit, layout} = useAppStore((state) => state);

  const openNote = async (note: Note) => {
    if (selectMode) return;
    const noteToOpen = await noteService.getNoteById(note.id);
    setCurrentNote(noteToOpen)
    openNoteEdit();
  };

  type ActionOption = { icon: IconName, action: () => void };

  const [confirmModalOpen, toggleConfirmModal] = useState<boolean>(false);
  const {
    selectMode,
    selectedNotes,
    setSelectedNotes,
    actionBarOpen,
    initSelectMode,
  } = useContext(SelectionContext);
  const matchNote = (noteId: NoteId) => selectedNotes.map(note => note.id).includes(noteId)
  const optionsList: ActionOption[] = [
    {
      icon: 'trash',
      action: () => {
        toggleConfirmModal(true);
      }
    },
  ];

  const updateSelectedNotes = (note: Note) => {
    if (!selectMode) return;

    if (matchNote(note.id)) {
      setSelectedNotes(selectedNotes.filter(c => c.id !== note.id));
      return;
    }
    setSelectedNotes([...selectedNotes, note]);
  }

  const deleteSelectedNotes = async () => {
    await noteService.deleteNotesById(selectedNotes.map(note => note.id));
    setSelectedNotes([]);
    toggleConfirmModal(false);
    onNoteListUpdate();
  }


  useEffect(() => {
    console.log(selectMode)
  }, [selectMode]);

  return (
    <NoteSection>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && (
        <NoteContainer className="grid" layout={layout}>
          {notes && notes.map((note: Note) => (
            <NoteCard
              className="grid-item"
              note={note}
              onLongPress={initSelectMode}
              onPressStart={updateSelectedNotes}
              onPressCancel={() => console.log('cancel')}
              onPressFinish={() => console.log('finish')}
              onPress={openNote}
              matchNote={matchNote(note.id)}
              key={note.id}/>
          ))}
        </NoteContainer>
      )}
      {
        actionBarOpen && (
          createPortal(
            <ActionModal options={optionsList}/>,
            document.body)
        )
      }
      {
        confirmModalOpen && (
          createPortal(
            <ConfirmModal message={t('notes.confirm.message')} onConfirm={deleteSelectedNotes} onCancel={() => toggleConfirmModal(false)}
                          subMessage={t('notes.confirm.subMessage')}/>,
            document.body)
        )
      }
    </NoteSection>
  )
}