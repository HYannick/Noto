import {fireEvent, render} from '@testing-library/react';
import {NoteCard} from '@/primary/note/NoteCard.tsx';
import {mockNote} from '@tests/fixtures/notes.mocks.ts';
import '@testing-library/jest-dom';

const renderComponent = (props?: any) => {
  const defaultProps = {
    className: 'test-class',
    note: mockNote({text: 'Dummy text'}),
    onPress: vi.fn(),
    ...props,
  }
  return render(<NoteCard {...defaultProps}/>);
}
describe('NoteCard', () => {
  it('should render card properly', () => {
    const {getByText} = renderComponent();

    expect(getByText('Aesthetics is the new Genre')).toBeInTheDocument();
    expect(getByText('Dummy text')).toBeInTheDocument();
    expect(getByText('Sat Dec 23 1995')).toBeInTheDocument();
  });

  it('should trigger onPress prop event on click', () => {
    const onPress = vi.fn();
    const {getByText} = renderComponent({onPress});

    const card = getByText('Aesthetics is the new Genre');
    fireEvent.click(card);

    expect(onPress).toHaveBeenCalled();
  });
});