import styled from '@emotion/styled';

export const CategoryModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--color-light);
  position: fixed;
  padding: 1.5rem;
  bottom: 0;
  left: 0;
  transform: translateX(100vw);
  z-index: 90;
  display: flex;
  flex-direction: column;

  .category-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .categories-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 0.5rem 0 1.5rem;

    p {
      font-size: 2rem;
      font-weight: 900;
      margin: 0;
    }
  }
`

export const CategoryItemComp = styled.div`
  display: flex;
  padding: 2rem;
  font-weight: 900;
  font-size: 1.5rem;
  box-shadow: inset 0 0 0 0.2rem var(--color-dark);
  background: var(--color-background);
  border-radius: 1rem;
  cursor: pointer;
  transition: background .05s ease, transform .05s ease;
  justify-content: space-between;

  ${(props: { selected: boolean, matchCategories: boolean }) => props.selected && `
    background: var(--color-primary);
    color: var(--color-light);
      box-shadow: inset 0 0 0 0.2rem var(--color-primary-dark);
  `}
  ${(props: { matchCategories: boolean }) => props.matchCategories && `
    background: var(--color-primary-light);
        transform: scale(.95);
    color: var(--color-primary);
      box-shadow: inset 0 0 0 0.2rem var(--color-primary);
  
  `}
`

export const CategoryFormComp = styled.form`
  display: flex;
  gap: 1.5rem;

  .formInput {
    flex: 1;
  }
`
