import sampleAvatar from '../../assets/sample-avatar.png'
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import IconButton from './IconButton.tsx';
import {useContext} from 'react';
import SideBar from './SideBar.tsx';
import appContext, {AppContextValues} from './contexts/AppContext.ts';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .greeting-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar {
    width: 8.5rem;
    height: 8.5rem;
    border-radius: 10px;
    overflow: hidden;
    border: 0.1rem solid var(--color-dark);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .greeting-text {
    font-size: 1.2rem;
    color: var(--color-grey);
    line-height: 0rem;
  }

  .greeting-username {
    color: var(--color-primary);
    font-weight: bold;
    font-size: 2.5rem;
  }
`

export default function Header() {
  const {t} = useTranslation();
  const {setSidebarState} = useContext(appContext) as AppContextValues;

  function openSidebar() {
    setSidebarState(true);
  }

  return (
    <HeaderContainer>
      <div className="greeting-container">
        <div className="avatar"><img src={sampleAvatar}/></div>
        <div className="greeting-text">
          <p>{t('hello')}</p>
          <p className="greeting-username">Ninska</p>
        </div>
      </div>
      <IconButton icon="menu" onPress={openSidebar}/>
      <SideBar/>
    </HeaderContainer>
  )
}
