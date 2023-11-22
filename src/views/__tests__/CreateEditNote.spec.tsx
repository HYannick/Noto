import {beforeEach, describe, expect, it, vi} from 'vitest';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import CreateEditNote from '../CreateEditNote.tsx';
import {mockNote} from '@tests/fixtures/notes.mocks.ts';
import {mockNoteService, mockNoteStore} from '@tests/fixtures/common.mocks.ts';
import * as useNoteStore from '@/primary/stores/note.store.ts';
import '@testing-library/jest-dom';


const getTags = (getByTestId: (id: string) => HTMLElement) => ({
  saveButton: getByTestId('save-button'),
  titleInput: getByTestId('title-input'),
  textInput: getByTestId('text-input'),
  noteDate: getByTestId('note-date'),
  backButton: getByTestId('back-button'),
})
const fillNote = (getByTestId: (id: string) => HTMLElement) => {
  const {titleInput, textInput, saveButton} = getTags(getByTestId)
  fireEvent.input(titleInput, {target: {value: "Lena's Inspiration"}})
  fireEvent.input(textInput, {target: {value: "Some Artsy stuff"}})
  fireEvent.submit(saveButton);
}

const noteService = mockNoteService({
  createNote: vi.fn().mockResolvedValue(mockNote({title: "Lena's Inspiration", text: "Some Artsy stuff"})),
  updateNote: vi.fn().mockResolvedValue(mockNote({
    id: 'updated-note',
    title: "Lena's Inspiration",
    text: "Some Artsy stuff"
  }))
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: vi.fn()
  })
}))

vi.mock('@/domain/hooks/UseInject.ts', () => ({
  useInject: vi.fn((() => noteService))
}))
const renderComponent = (onNoteToUpdate: () => void = vi.fn()) => {
  return render(
    <CreateEditNote onNoteUpdate={onNoteToUpdate}/>
  );
}


describe('CreateEditNote view', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('Options list', () => {
    it('should not display option button for an empty note', async () => {
      renderComponent();
      expect(screen.queryByTestId('options-button')).not.toBeInTheDocument();
    });
    it('should display option button after saving a note', async () => {
      const {getByTestId} = renderComponent();

      await act(async () => fillNote(getByTestId));
      expect(getByTestId('options-button')).toBeInTheDocument();
    });

    it('should display option button for an note', () => {
      const currentNote = mockNote({id: 'updated-note'});
      const setCurrentNote = vi.fn();
      vi.spyOn(useNoteStore, 'useNoteStore').mockImplementation(() => mockNoteStore({
        currentNote,
        setCurrentNote
      }));
      const {getByTestId} = renderComponent();
      expect(getByTestId('options-button')).toBeInTheDocument();
    });
  });
  describe('Note Handling', () => {
    it('should create a note if no active note', async () => {
      const setCurrentNote = vi.fn();
      vi.spyOn(useNoteStore, 'useNoteStore').mockImplementation(() => mockNoteStore({
        setCurrentNote
      }));
      const {getByTestId} = renderComponent();

      await act(async () => fillNote(getByTestId));


      expect(noteService.createNote).toHaveBeenCalledWith({title: "Lena's Inspiration", text: "Some Artsy stuff"})
      expect(noteService.updateNote).not.toHaveBeenCalled()
      expect(setCurrentNote).toHaveBeenCalledWith(mockNote({title: "Lena's Inspiration", text: "Some Artsy stuff"}))
      cleanup();
    });
    it('should update the current note if exist', async () => {
      const currentNote = mockNote({id: 'updated-note'});
      const setCurrentNote = vi.fn();
      vi.spyOn(useNoteStore, 'useNoteStore').mockImplementation(() => mockNoteStore({
        currentNote,
        setCurrentNote
      }));
      const {getByTestId} = renderComponent();

      await act(async () => fillNote(getByTestId));


      expect(noteService.createNote).not.toHaveBeenCalled()
      expect(noteService.updateNote).toHaveBeenCalledWith('updated-note', {
        ...mockNote({id: 'updated-note'}),
        title: "Lena's Inspiration",
        text: "Some Artsy stuff"
      })
      expect(setCurrentNote).toHaveBeenCalledWith(mockNote({
        id: 'updated-note',
        title: "Lena's Inspiration",
        text: "Some Artsy stuff"
      }))
      cleanup();
    });
    it('should trigger noteToUpdate event on save', async () => {
      const onNoteToUpdateEvent = vi.fn();
      const {getByTestId} = renderComponent(onNoteToUpdateEvent);

      await act(async () => fillNote(getByTestId));

      expect(onNoteToUpdateEvent).toHaveBeenCalled();
    });
  });
});
