import {NoteCard} from './NoteCard.tsx';
import styled from '@emotion/styled';
import {useContext, useEffect, useState} from 'react';
import AppContext, {AppContextValues} from '../common/contexts/AppContext.ts';
import {useInject} from '../../domain/hooks/UseInject.ts';
import {INoteService} from './NoteService.tsx';
import NoteContext, {NoteContextValues} from '../common/contexts/NoteContext.ts';


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
  padding: 2rem 1.5rem;
  margin: 1.5rem -1.5rem -1.5rem;
`

export default function NoteList() {
  const noteService = useInject('noteService') as INoteService
  const {setCreateEditNoteState} = useContext(AppContext) as AppContextValues;
  const {notes, setNotes, setCurrentNote} = useContext(NoteContext) as NoteContextValues;
  const openNote = async (noteId: string) => {
    const note = await noteService.getNoteById(noteId);
    setCurrentNote(note);
    setCreateEditNoteState(true);

  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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


  useEffect(() => {
    fetchNotes();
  }, [noteService, notes]);

  return (
    <NoteSection>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && (
        <NoteContainer className="grid">
          {notes.map((note) => (
            <NoteCard className="grid-item" note={note} key={note.id} onPress={() => openNote(note.id)}></NoteCard>
          ))}
        </NoteContainer>
      )}
    </NoteSection>
  )
}