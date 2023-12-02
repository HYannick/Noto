import styled from '@emotion/styled';

export const IconAddButton = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  z-index: 5;
`

export const StickyHeader = styled.div`
  position: sticky;
  top: -0.1rem;
  margin: 0 -1.5rem;
  z-index: 10;
  background: var(--color-light);
  padding: 1.5rem;
  border-bottom: ${(props: {isPinned: boolean }) => props.isPinned && '0.1rem solid var(--color-dark)'};
`