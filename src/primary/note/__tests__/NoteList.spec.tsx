import {expect, vi} from 'vitest';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {mockNote} from '@tests/fixtures/notes.mocks.ts';
import '@testing-library/jest-dom';
import NoteList from '@/primary/note/NoteList.tsx';
import {ContainerProvider} from '@/primary/common/ContainerProvider.tsx';
import {mockAppStore, mockContainer, mockNoteService, mockNoteStore} from '@tests/fixtures/common.mocks.ts';
import * as useNoteStore from '@/primary/stores/note.store.ts';
import * as useAppStore from '@/primary/stores/app.store.ts';
import * as useInject from '@/domain/hooks/UseInject.ts';

const renderComponent = (props?: any) => {
  const defaultProps = {
    loading: false,
    error: null,
    notes: [mockNote(), mockNote({id: '2', title: 'Other Note'})],
    ...props,
  }
  return render(<ContainerProvider container={mockContainer()}>
    <NoteList {...defaultProps}/>
  </ContainerProvider>);
}
describe('NoteList', () => {
  it('should render list properly', () => {
    const {getByText} = renderComponent();
    const loading = screen.queryByText('Loading...');
    const error = screen.queryByText('Error message');
    expect(error).not.toBeInTheDocument()
    expect(loading).not.toBeInTheDocument()
    expect(getByText('Aesthetics is the new Genre')).toBeInTheDocument();
    expect(getByText('Other Note')).toBeInTheDocument();
  });

  it('should render loading state if loading', () => {
    renderComponent({loading: true});
    const loading = screen.queryByText('Loading...');
    const error = screen.queryByText('Error message');
    const card = screen.queryByText('Aesthetics is the new Genre');
    expect(error).not.toBeInTheDocument()
    expect(card).not.toBeInTheDocument();
    expect(loading).toBeInTheDocument();
  });

  it('should render error message if any', () => {
    renderComponent({error: 'Error message'});
    const loading = screen.queryByText('Loading...');
    const error = screen.queryByText('Error message');
    const card = screen.queryByText('Aesthetics is the new Genre');
    expect(error).toBeInTheDocument()
    expect(card).not.toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
  });

  it('should open a note on NoteCard componnent click', async () => {
    const expectedNote = mockNote()
    const getNoteById = vi.fn().mockResolvedValue(expectedNote);
    const openNoteEdit = vi.fn();
    const setCurrentNote = vi.fn();

    vi.spyOn(useInject, 'useInject').mockImplementation(() => mockNoteService({
      getNoteById,
    }));
    vi.spyOn(useNoteStore, 'useNoteStore').mockImplementation(() => mockNoteStore({
      setCurrentNote
    }));
    vi.spyOn(useAppStore, 'useAppStore').mockImplementation(() => mockAppStore({
      openNoteEdit,
    }));
    const {getByText} = renderComponent();
    const card = getByText('Other Note');

    await act(async () => {
      fireEvent.click(card);
    });
    expect(getNoteById).toHaveBeenCalledWith('2');
    expect(setCurrentNote).toHaveBeenCalledWith(expectedNote);
    expect(openNoteEdit).toHaveBeenCalled();
  });
});