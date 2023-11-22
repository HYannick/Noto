import styled from '@emotion/styled';
import {Note} from '@/domain/Note.ts';

const StyledNoteCard = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 0.5rem;
  height: 20rem;
  border: none;
  background: var(--color-dark);
  cursor: pointer;

  &:active {
    .card-content {
      transform: translateY(-0.2rem);
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 20rem;
    z-index: -1;
    border-radius: 0.5rem;
    border: none;
    background: var(--color-light);
    box-shadow: inset 0 0 0 0.1rem var(--color-dark);
    transform: translateY(-0.6rem);
  }
  
  .note-title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 900;
  }
  .note-text {
    margin: 1rem 0;
    font-size: 1.4rem;
    color: var(--color-grey);
    height: 10rem;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
  }
  
  .note-date {
    position: absolute;
    bottom: 0;
    right: 1rem;
    font-size: 0.8rem;
    color: var(--color-grey);
  }
`

export const NoteCard = ({onPress, className, note}: { note: Note, className: any, onPress: () => void }) => {
  return (
    <StyledNoteCard className={className} onClick={onPress}>
      <div className="card-content">
        <h4 className="note-title">{note.title}</h4>
        <p className="note-text">{note.text}</p>
        <p className="note-date">{new Date(note.date).toDateString()}</p>
      </div>
    </StyledNoteCard>
  )
}
