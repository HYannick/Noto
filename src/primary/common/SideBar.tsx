import IconButton from './IconButton.tsx';
import {changeLanguage} from 'i18next';
import styled from '@emotion/styled';
import {useContext} from 'react';
import AppContext, {AppContextValues} from './contexts/AppContext.ts';
import sampleAvatar from '../../assets/sample-avatar.png'
import InputField from './InputField.tsx';
import {useTranslation} from 'react-i18next';
import DefaultButton from './DefaultButton.tsx';
import {useTheme} from '../../domain/hooks/UseTheme.ts';
import {IconName} from '../../assets/svg/icons';
import * as localforage from 'localforage';
export const SideBarContainer = styled.div`
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  top: 0;
  transform: translateX(${(props: {isOpen: boolean}) => props.isOpen ? '0' : '80vw'});
  background: var(--color-light);
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  transition: transform .3s cubic-bezier(0, 0.55, 0.45, 1) .15s;
  .app-settings {
    display: flex;
    justify-content: space-between;
  }
  .app-languages {
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
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
  }
`

export const AppUserInfos = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.1rem;
  .user-avatar {
    width: 10rem;
    height: 10rem;
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

export const SidebarOverlay = styled.div`
  position: fixed;
  z-index: 9;
  background: var(--color-light);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${(props: {isOpen: boolean}) => props.isOpen ? '0.8' : '0'};
  visibility: ${(props: {isOpen: boolean}) => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
`

export default function SideBar() {
  const {sidebarOpen, setSidebarState} = useContext(AppContext) as AppContextValues;
  const {t} = useTranslation();
  const {switchTheme, themeIcon} = useTheme();
  function closeSidebar() {
    setSidebarState(false);
  }

  function clearData() {
    localforage.setItem('notes', [])
  }
  return (
    <>
      <SideBarContainer isOpen={sidebarOpen}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            N<span>ō</span>to
          </div>
          <IconButton icon="close" onPress={closeSidebar} dataTestId="close-sidebar-button"/>
          <IconButton icon="trash" onPress={clearData} dataTestId="clear-data-button"/>
        </div>
        <div className="sidebar-menu">
        </div>
        <div className="app-options">
          <AppUserInfos>
            <div className="user-avatar" data-testid="user-avatar">
              <img src={sampleAvatar} alt="avatar" />
            </div>
            <div className="user-infos">
              <div className="user-input" data-testid="user-input">
                <InputField type="text" placeholder={t('options.userInfos.placeholder')} />
              </div>
              <DefaultButton dataTestId="user-save-button" label={t('buttons.save')} />
            </div>
          </AppUserInfos>
          <div className="app-settings">
            <div className="app-languages">
              <IconButton icon="en-flag" color="none" onPress={() => changeLanguage('en')} dataTestId="en-language-button"/>
              <IconButton icon="de-flag" color="none" onPress={() => changeLanguage('de')} dataTestId="de-language-button"/>
              <IconButton icon="fr-flag" color="none" onPress={() => changeLanguage('fr')} dataTestId="fr-language-button"/>
            </div>
            <div className="app-theme">
              <IconButton icon={themeIcon as IconName} onPress={switchTheme}/>
            </div>
          </div>

        </div>
      </SideBarContainer>
      <SidebarOverlay isOpen={sidebarOpen} onClick={closeSidebar} />
    </>
  )
}
