import {vi, beforeEach, it, describe, expect} from 'vitest';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import {AppContext, NoteContext} from '../../primary/common/contexts';
import CreateEditNote from '../CreateEditNote.tsx';
import {mockNote} from '../../../tests/fixtures/notes.mocks.ts';
import {mockAppContextValues, mockNoteContextValues, mockNoteService} from '../../../tests/fixtures/common.mocks.ts';

const appContext = mockAppContextValues({createEditNoteOpen: true});
const noteContext = mockNoteContextValues();
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

vi.mock('../../domain/hooks/UseInject.ts', () => ({
  useInject: vi.fn((() => noteService))
}))
const renderComponent = () => {
  const wrapper = render(
    <AppContext.Provider value={appContext}>
      <NoteContext.Provider value={noteContext}>
        <CreateEditNote/>
      </NoteContext.Provider>
    </AppContext.Provider>
  )

  return wrapper;
}

const getTags = (getByTestId: (id: string) => HTMLElement) => ({
  saveButton: getByTestId('save-button'),
  titleInput: getByTestId('title-input'),
  textInput: getByTestId('text-input'),
  noteDate: getByTestId('note-date'),
  backButton: getByTestId('back-button'),
})

describe('CreateEditNote view', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a note if no active note', async () => {
    const {getByTestId} = renderComponent();
    const {titleInput, textInput, saveButton} = getTags(getByTestId)

    await act(async () => {
      fireEvent.input(titleInput, {target: {value: "Lena's Inspiration"}})
      fireEvent.input(textInput, {target: {value: "Some Artsy stuff"}})

      fireEvent.submit(saveButton);
    })


    expect(noteService.createNote).toHaveBeenCalledWith({title: "Lena's Inspiration", text: "Some Artsy stuff"})
    expect(noteService.updateNote).not.toHaveBeenCalled()
    expect(noteContext.setCurrentNote).toHaveBeenCalledWith(mockNote({title: "Lena's Inspiration", text: "Some Artsy stuff"}))
    cleanup();
  });
  it('should update the current note if exist', async () => {
    noteContext.currentNote = mockNote({id: 'updated-note'});

    const {getByTestId} = renderComponent();
    const {titleInput, textInput, saveButton} = getTags(getByTestId)

    await act(async () => {
      fireEvent.input(titleInput, {target: {value: "Lena's Inspiration"}})
      fireEvent.input(textInput, {target: {value: "Some Artsy stuff"}})

      fireEvent.submit(saveButton);
    })


    expect(noteService.createNote).not.toHaveBeenCalled()
    expect(noteService.updateNote).toHaveBeenCalledWith('updated-note', {
      ...mockNote({id: 'updated-note'}),
      title: "Lena's Inspiration",
      text: "Some Artsy stuff"
    })
    expect(noteContext.setCurrentNote).toHaveBeenCalledWith(mockNote({
      id: 'updated-note',
      title: "Lena's Inspiration",
      text: "Some Artsy stuff"
    }))
    cleanup();
  });
});
