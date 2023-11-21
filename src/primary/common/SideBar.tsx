import IconButton from './IconButton.tsx';
import {changeLanguage} from 'i18next';
import styled from '@emotion/styled';
import InputField from './InputField.tsx';
import {useTranslation} from 'react-i18next';
import DefaultButton from './DefaultButton.tsx';
import {useTheme} from '@/domain/hooks/UseTheme.ts';
import {IconName} from '@assets/svg/icons';
import * as localforage from 'localforage';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {IUserService} from '@/primary/user/UserService.ts';
import {useUserStore} from '@/primary/stores/user.store.ts';
import ImageUploader from './ImageUploader.tsx';
import {ImageBlob} from '@/domain/ImageBlob.ts';
import gsap from 'gsap';

export const SideBarContainer = styled.div`
  position: fixed;
  z-index: 20;
  right: 0;
  bottom: 0;
  top: 0;
  transform: translateX(80vw);
  background: var(--color-light);
  width: 80vw;
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

export default function SideBar() {
  const closeSidebar = useAppStore((state) => state.closeSidebar)
  const setNotes = useNoteStore((state) => state.setNotes)
  const userService = useInject('userService');
  const {username: defaultUsername, avatar: defaultAvatar, setUserInfos} = useUserStore((state) => state);
  const {t} = useTranslation();
  const {switchTheme, themeIcon} = useTheme();
  const [username, setUsername] = useState('Stranger');
  const [avatar, setAvatar] = useState<ImageBlob>(null);

  useEffect(() => {
    setUsername(defaultUsername);
    setAvatar(defaultAvatar);
  }, [defaultAvatar, defaultUsername]);
  const componentRef = useRef(null);
  const overlayRef = useRef(null);
  const beforeClose = () => {
    const tl= gsap.timeline({
      onComplete: closeSidebar,
    });
    tl
      .to(overlayRef.current, {
        duration: 0.3,
        autoAlpha: 0,
        ease: 'expo.out',
      }, '-=0.3')
      .to(componentRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        x: '80vw',
        ease: 'expo.out',
      })

  }
  useEffect(() => {
    const tl= gsap.timeline();
    tl
      .to(overlayRef.current, {
        duration: 0.3,
        autoAlpha: 0.8,
        ease: 'expo.out',
      }, '-=0.3')
      .to(componentRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        x: 0,
        ease: 'expo.out',
      })
  }, []);



  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userToSave = {username, avatar,}
    await userService.saveUser(userToSave)
    setUserInfos(userToSave);
  }
  const updateAvatar = (blob: Blob) => {
    if (!blob) return;
    setAvatar(blob);
  }
  const setLanguage = (lang: string) => {
    localforage.setItem('currentLang', lang)
    changeLanguage(lang)
  }

  const clearData = () => {
    localforage.setItem('notes', [])
    setNotes([])
  }

  return (
    <>
      <SideBarContainer ref={componentRef}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            N<span>ō</span>to
          </div>
          <IconButton icon="close" onPress={beforeClose} dataTestId="close-sidebar-button"/>
          <IconButton icon="trash" onPress={clearData} dataTestId="clear-data-button"/>
        </div>
        <div className="sidebar-menu">
        </div>
        <div className="app-options">
          <AppUserInfos>
            <div className="user-avatar" data-testid="user-avatar">
              <ImageUploader value={defaultAvatar} onImageUploaded={updateAvatar}/>
            </div>
            <form className="user-infos" onSubmit={updateUser}>
              <div className="user-input" data-testid="user-input">
                <InputField value={username} type="text" onInput={(e) => setUsername(e.target.value)}
                            placeholder={t('options.userInfos.placeholder')}/>
              </div>
              <DefaultButton dataTestId="user-save-button" label={t('buttons.save')}/>
            </form>
          </AppUserInfos>
          <div className="app-settings">
            <div className="app-languages">
              <IconButton icon="en-flag" color="none" onPress={() => setLanguage('en')} dataTestId="en-language-button"/>
              <IconButton icon="de-flag" color="none" onPress={() => setLanguage('de')} dataTestId="de-language-button"/>
              <IconButton icon="fr-flag" color="none" onPress={() => setLanguage('fr')} dataTestId="fr-language-button"/>
            </div>
            <div className="app-theme">
              <IconButton icon={themeIcon as IconName} onPress={switchTheme}/>
            </div>
          </div>

        </div>
      </SideBarContainer>
      <Overlay ref={overlayRef} onClick={beforeClose}/>
    </>
  )
}
