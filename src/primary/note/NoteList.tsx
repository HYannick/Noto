import {NoteCard} from './NoteCard.tsx';
import styled from '@emotion/styled';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {Note} from '@/domain/Note.ts';

export const NoteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  border-radius: 2rem;
  padding: 2.5rem 1.5rem;
  margin: 0 -1.5rem -1.5rem;
  border: 0.1rem solid var(--color-dark);
  @media screen and (min-width: 1024px) {
    border-radius: 1rem 1rem 0 0;
  }
`

export default function NoteList({loading, error, notes}: any) {
  const noteService = useInject('noteService');
  const {setCurrentNote} = useNoteStore((state) => state);
  const {openNoteEdit} = useAppStore((state) => state);

  const openNote = async (noteId: string) => {
    const note = await noteService.getNoteById(noteId);
    setCurrentNote(note)
    openNoteEdit();
  };
  return (
    <NoteSection>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && (
        <NoteContainer className="grid">
          {notes && notes.map((note: Note) => (
            <NoteCard className="grid-item" note={note} key={note.id} onPress={() => openNote(note.id)}></NoteCard>
          ))}
        </NoteContainer>
      )}
    </NoteSection>
  )
}