import styled from '@emotion/styled';
import {Note} from '@/domain/Note.ts';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useLongPress} from 'use-long-press';
import Icon from '@/primary/common/Icon.tsx';

const StyledNoteCard = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 0.5rem;
  height: ${(props: { layout: 'grid' | 'list' }) => props.layout == 'grid' ? '20rem' : '10rem'};
  border: none;
  background: var(--color-dark);
  ${(props: { matchNote: boolean }) => props.matchNote && `
    background: var(--color-primary);
  `}
  cursor: pointer;

  &:active {
    .card-content {
      transform: translateY(-0.2rem);
      user-select: none;
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: ${(props: { layout: 'grid' | 'list', matchNote: boolean }) => props.layout == 'grid' ? '20rem' : '10rem'};
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

  ${(props: { matchNote: boolean }) => props.matchNote && `
   .card-content {
      transform: translateY(-0.2rem);
      user-select: none;
      box-shadow: inset 0 0 0 0.1rem var(--color-primary);
    }
  `}
`
type NoteCardProps = {
  onPress: (note: Note) => void,
  className?: string,
  note: Note,
  onPressStart: (note: Note) => void,
  onPressCancel: (note: Note) => void,
  onPressFinish: (note: Note) => void,
  onLongPress: (note: Note) => void,
  matchNote: boolean,
}

export const NoteCard = ({onPress, className, note, onPressStart, onPressCancel, onPressFinish, onLongPress, matchNote}: NoteCardProps) => {
  const {layout} = useAppStore();
  const bind = (note: Note) => useLongPress(() => onLongPress(note), {
    onStart: () => onPressStart(note),
    onCancel: () => onPressCancel(note),
    onFinish: () => onPressFinish(note),
    threshold: 500,
  });
  return (
    <StyledNoteCard {...bind(note)()} className={className} onClick={() => onPress(note)} layout={layout} matchNote={matchNote}>
      <div className="card-content">
        <h4 className="note-title">{note.title}</h4>
        <p className="note-text">{note.text}</p>
        <p className="note-date">{new Date(note.date).toDateString()}</p>
        {matchNote && <Icon icon='check' color='primary' iconSize='1.8'/>}
      </div>
    </StyledNoteCard>
  )
}
