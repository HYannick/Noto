import styled from '@emotion/styled';
import IconButton from '@/primary/common/IconButton.tsx';
import DefaultButton from '@/primary/common/DefaultButton.tsx';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import InputField from '@/primary/common/InputField.tsx';
import {useTranslation} from 'react-i18next';
import {Note, NoteToCreate} from '@/domain/Note.ts';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {INoteService} from '@/primary/note/NoteService.tsx';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import OptionMenu from '@/primary/common/OptionMenu.tsx';

export const CreateEditNoteForm = styled.form`
  transform: translateY(${(props: { isOpen: boolean }) => props.isOpen ? '0' : '100vh'});
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: var(--color-light);
  display: flex;
  flex-direction: column;

  .create-note-header {
    padding: 1.5rem;
    background: var(--color-background);
  }

  .create-note-footer {
    padding: 1.5rem;
    display: flex;
    justify-content: flex-end;
  }

  .create-note-title {
    margin-top: 1.5rem;

    input {
      font-size: 4rem;
    }
  }

  .create-note-body {
    flex: 1
  }

  .create-note-current-date {
    display: block;
    margin-top: 1rem;
    color: var(--color-grey-500);
  }

  .create-note-textarea {
    font-size: 1.6rem;
    border: none;
    background: transparent;
    width: 100%;
    resize: none;
    color: var(--color-dark);
    padding: 1.5rem;
    height: 100%;
    outline: transparent;
    font-family: var(--main-font);
  }
`

export const NoteHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`
export default function CreateEditNote({onNoteUpdate}: { onNoteUpdate: () => void }) {
  const currentNote = useNoteStore(state => state.currentNote)
  const setCurrentNote = useNoteStore(state => state.setCurrentNote)
  const closeNoteEdit = useAppStore(state => state.closeNoteEdit)
  const createEditNoteOpen = useAppStore(state => state.createEditNoteOpen)
  const {t} = useTranslation();
  const noteService = useInject('noteService') as INoteService;
  const currentDate = new Date();
  const initialValues = {
    title: '',
    text: '',
  }
  const [noteToCreate, setNoteToCreate] = useState<NoteToCreate>(initialValues)
  const updateNote = (key: string, value: string) => {
    setNoteToCreate({...noteToCreate, [key]: value})
  }

  const resetNote = () => {
    setNoteToCreate(initialValues)
    setCurrentNote(null);
  }
  const goBack = async (e: any) => {
    e.preventDefault();
    await saveNote(e);
    closeNoteEdit();
    resetNote()
  }
  const saveNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!noteToCreate.text) return;

    let updatedNote: Note;

    if (currentNote) {
      updatedNote = await noteService.updateNote(currentNote.id, {...currentNote, ...noteToCreate});
    } else {
      updatedNote = await noteService.createNote(noteToCreate);
    }

    setCurrentNote(updatedNote);
    onNoteUpdate();
  };
  const deleteNote = async (e: any) => {
    e.preventDefault();
    if (!currentNote) return;
    await noteService.deleteNoteById(currentNote.id)
    goBack(e);
  }
  const optionsList = [
    {
      label: t('createNote.actions.delete'),
      action: deleteNote
    },
    {
      label: t('createNote.actions.save'),
      action: saveNote
    }
  ]



  useEffect(() => {
    if (currentNote) {
      setNoteToCreate({title: currentNote.title, text: currentNote.text})
    }
  }, [currentNote]);
  return (
    <CreateEditNoteForm  isOpen={createEditNoteOpen} onSubmit={saveNote}>
      <div className="create-note-header">
        <NoteHeaderActions className="create-note-actions">
          <IconButton dataTestId="back-button" icon="back" onPress={goBack}/>
          {currentNote && <OptionMenu optionList={optionsList} />}
        </NoteHeaderActions>
        <div className="create-note-title">
          <InputField type="text"
                      dataTestId="title-input"
                      placeholder={t('createNote.placeholders.title')}
                      variant="borderless"
                      value={noteToCreate.title}
                      onInput={(e) => updateNote('title', e.target.value)}/>
          <span data-testid="note-date" className="create-note-current-date">{currentDate.toDateString()}</span>
        </div>
      </div>

      <div className="create-note-body">
        {/*<Editor />*/}
        <textarea data-testid="text-input" className="create-note-textarea" value={noteToCreate.text}
                  onInput={(e: ChangeEvent<HTMLTextAreaElement>) => updateNote('text', e.target.value)}></textarea>
      </div>
      <div className="create-note-footer">
        <DefaultButton dataTestId="save-button" type="submit" icon="save" label={t('buttons.save')}/>
      </div>
    </CreateEditNoteForm>
  )
}