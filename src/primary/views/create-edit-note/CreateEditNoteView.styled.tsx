import styled from '@emotion/styled';

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
    flex: 1;
    border-bottom: 0.1rem solid var(--color-grey);
    background: var(--color-light);
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
