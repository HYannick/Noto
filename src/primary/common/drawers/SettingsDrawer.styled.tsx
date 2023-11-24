import styled from '@emotion/styled';

export const SideBarContainer = styled.div`
  position: fixed;
  z-index: 20;
  right: 0;
  bottom: 0;
  top: 0;
  transform: translateX(80vw);
  background: var(--color-light);
  width: 85vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;

  .app-settings {
    display: flex;
    justify-content: space-between;
  }

  .app-languages {
    display: flex;
    padding: 1.5rem;
    gap: 1.5rem;
    justify-content: flex-end;
  }

  .sidebar-header {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;
  }

  .sidebar-title {
    font-size: 4rem;
    font-weight: bolder;

    span {
      color: var(--color-primary);
    }
  }

  .sidebar-menu {
    flex: 1;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const AppUserInfos = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  .user-avatar {
    width: 11rem;
    height: 11rem;
    border-radius: 0.5rem;
    border: 0.1rem solid var(--color-dark);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-infos {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`

export const OptionItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem -1.5rem;
  border-bottom: 0.1rem solid var(--color-grey-light);
  .option-label {
    font-weight: bold;
    margin-bottom: 1rem;
    padding: 0 1.5rem;
    color: var(--color-primary);
  }
  .option-buttons {
    background: transparent;
    border: none;
    font-size: 1.6rem;
    color: var(--color-dark);
    padding: 1.5rem ;
    font-weight: bolder;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .options-buttons-actions {
      display: flex;
      gap: 1.5rem;
    }
  }
`

export const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  background: var(--color-light);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: visible;
  transition: opacity 0.3s, visibility 0.3s;
`
