import IconButton from '@/primary/common/buttons/IconButton.tsx';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import InputField from '@/primary/common/InputField.tsx';
import {useTranslation} from 'react-i18next';
import {Note, NoteToCreate} from '@/domain/Note.ts';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import OptionMenu from '@/primary/common/OptionMenu.tsx';
import gsap from 'gsap';
import {CreateEditNoteForm, NoteHeaderActions} from '@/primary/views/create-edit-note/CreateEditNoteView.styled.tsx';
import {useHistory} from '@/domain/hooks/useHistory.ts';


export default function CreateEditNoteView({onNoteUpdate}: { onNoteUpdate: () => void }) {
  const noteService = useInject('noteService');

  const {currentNote, setCurrentNote} = useNoteStore();
  const {closeNoteEdit, openCategoryModal, createEditNoteOpen} = useAppStore();

  const tl = gsap.timeline()
  const {t} = useTranslation();
  const currentDate = new Date();
  const initialValues = {
    title: '',
    text: '',
  }

  const [noteToCreate, setNoteToCreate] = useState<NoteToCreate>(initialValues)
  const componentRef = useRef(null);
  const backButtonRef = useRef(null);
  const saveButtonRef = useRef(null);

  const updateNote = (key: string, value: string) => {
    setNoteToCreate({...noteToCreate, [key]: value})
  }

  const resetNote = () => {
    setNoteToCreate(initialValues)
    setCurrentNote(null);
  }

  const goBack = async () => {
    await saveNote();
    unMountComp(() => {
      closeNoteEdit();
      resetNote()
    })
  }

  const saveNote = async () => {

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
      goBack();
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

  const unMountComp = (onComplete: () => void) => {
    gsap
      .to(componentRef.current, {
        duration: 0.3,
        autoAlpha: 0,
        ease: 'expo.out',
        onComplete
      })
  }

  useEffect(() => {
    if (currentNote) {
      setNoteToCreate({title: currentNote.title, text: currentNote.text})
    }
  }, [currentNote]);

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

  useHistory('createEditNoteOpen', createEditNoteOpen, goBack);
  return (
    <CreateEditNoteForm ref={componentRef} onSubmit={saveNote}>
      <div className="create-note-header">
        <NoteHeaderActions className="create-note-actions">
          <div className="back-button" ref={backButtonRef}>
            <IconButton dataTestId="back-button" icon="back" onPress={goBack}/>
          </div>
          {currentNote && <OptionMenu optionList={optionsList}/>}
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
          <IconButton dataTestId="save-button" icon="save" backgroundColor="valid" color="valid-dark" shadowColor="valid-dark"/>
        </div>
      </div>
    </CreateEditNoteForm>
  )
}