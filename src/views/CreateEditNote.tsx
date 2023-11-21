import styled from '@emotion/styled';
import IconButton from '@/primary/common/IconButton.tsx';
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import InputField from '@/primary/common/InputField.tsx';
import {useTranslation} from 'react-i18next';
import {Note, NoteToCreate} from '@/domain/Note.ts';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import OptionMenu from '@/primary/common/OptionMenu.tsx';
import gsap from 'gsap';

export const CreateEditNoteForm = styled.form`
  transform: translateY(10vh);
  opacity: 0;
  visibility: hidden;
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

  .save-button, .back-button {
    opacity: 0;
    scale: 0.8;
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
  let tl = gsap.timeline()
  const {currentNote, setCurrentNote} = useNoteStore()
  const {closeNoteEdit, openCategoryModal} = useAppStore()
  const {t} = useTranslation();
  const noteService = useInject('noteService');
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
    unMountComp(() => {
      closeNoteEdit();
      resetNote()
    })
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
    unMountComp(() => {
      goBack(e);
    })
  }
  const optionsList = [
    {
      label: t('createNote.actions.delete'),
      action: deleteNote
    },
    {
      label: t('createNote.actions.save'),
      action: saveNote
    },
    {
      label: t('createNote.actions.moveTo'),
      action: openCategoryModal
    }
  ]



  useEffect(() => {
    if (currentNote) {
      setNoteToCreate({title: currentNote.title, text: currentNote.text})
    }
  }, [currentNote]);

  const componentRef = useRef(null);
  const backButtonRef = useRef(null);
  const saveButtonRef = useRef(null);
  useEffect(() => {
    tl
      .to(componentRef.current, {
      duration: 0.5,
      autoAlpha: 1,
      y: 0,
      ease: 'expo.out',
    })
      .to(backButtonRef.current, {
      duration: 0.5,
      autoAlpha: 1,
      scale: 1,
      ease: 'elastic.out',
    }, '-=0.3')
      .to(saveButtonRef.current, {
      duration: 0.5,
      autoAlpha: 1,
      scale: 1,
      ease: 'elastic.out',
    }, '-=0.35')
  }, []);

  const unMountComp = (onComplete: () => void) => {
    gsap
      .to(componentRef.current, {
        duration: 0.3,
        autoAlpha: 0,
        ease: 'expo.out',
        onComplete
      })
  }
  return (
    <CreateEditNoteForm ref={componentRef} onSubmit={saveNote}>
      <div className="create-note-header">
        <NoteHeaderActions className="create-note-actions">
          <div className="back-button" ref={backButtonRef}>
            <IconButton dataTestId="back-button" icon="back" onPress={goBack}/>
          </div>
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
        <div ref={saveButtonRef} className="save-button">
          <IconButton dataTestId="save-button" icon="save" backgroundColor="valid" color="valid-dark" shadowColor="valid-dark" />
        </div>
      </div>
    </CreateEditNoteForm>
  )
}