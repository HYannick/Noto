import IconButton from '../buttons/IconButton.tsx';
import {changeLanguage} from 'i18next';
import InputField from '../InputField.tsx';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../buttons/DefaultButton.tsx';
import {useTheme} from '@/domain/hooks/UseTheme.ts';
import {IconName} from '@assets/svg/icons';
import * as localforage from 'localforage';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {useUserStore} from '@/primary/stores/user.store.ts';
import ImageUploader from '../ImageUploader.tsx';
import {ImageBlob} from '@/domain/ImageBlob.ts';
import gsap from 'gsap';
import {AppUserInfos, OptionItem, Overlay, SideBarContainer} from '@/primary/common/drawers/SettingsDrawer.styled.tsx';


export default function SettingsDrawer() {
  const {closeSidebar, setLayout} = useAppStore()
  const {setNotes} = useNoteStore()
  const userService = useInject('userService');
  const {username: defaultUsername, avatar: defaultAvatar, setUserInfos} = useUserStore();
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
    const tl = gsap.timeline({
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
        x: '85vw',
        ease: 'expo.out',
      })

  }
  useEffect(() => {
    const tl = gsap.timeline();
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
  const setLanguage = async (lang: string) => {
    await localforage.setItem('currentLang', lang)
    await changeLanguage(lang)
  }

  const saveLayout = async (layout: 'grid' | 'list') => {
    await localforage.setItem('currentLayout', layout)
    setLayout(layout)
  }

  const clearData = () => {
    alert('This will clear all your data. This action is irreversible.');
    localforage.setItem('notes', [])
    setNotes([])
  }
  const clearNotes = () => {
    alert('This will clear all your notes. This action is irreversible.');
    localforage.setItem('notes', [])
    setNotes([])
  }

  const clearCategories = () => {
    alert('This will clear all your categories. This action is irreversible.')
    localforage.setItem('categories', [])
    setNotes([])
  }

  return (
    <>
      <SideBarContainer data-testid="settings-drawer" ref={componentRef}>
          <div className="sidebar-header">
            <div className="sidebar-title">
              N<span>ō</span>to
            </div>
            <IconButton icon="close" variant="borderless" onPress={beforeClose} dataTestId="close-sidebar-button"/>
          </div>
          <div className="sidebar-menu">
            <OptionItem>
              <div className="option-label">{t('options.userInfos.label')}</div>
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
            </OptionItem>
            <OptionItem>
              <div className="option-label">{t('options.style.label')}</div>
              <div className="option-buttons">
                <span>{t('options.style.layout')}</span>
                <div className="options-buttons-actions">
                  <IconButton icon="layout-list" onPress={() => saveLayout('list')}/>
                  <IconButton icon="layout-grid" onPress={() => saveLayout('grid')}/>
                </div>
              </div>
              {/*<div className="option-buttons">{t('options.style.sort')}</div>*/}
              <div className="option-buttons">
                <span>{t('options.style.theme')}</span>
                <div className="options-buttons-actions">
                  <IconButton icon={themeIcon as IconName} onPress={switchTheme}/>
                </div>
              </div>
              <div className="option-buttons">
                <span>{t('options.languages.label')}</span>
                <div className="options-buttons-actions">
                  <IconButton icon="en-flag" color="none" onPress={() => setLanguage('en')} dataTestId="en-language-button"/>
                  <IconButton icon="de-flag" color="none" onPress={() => setLanguage('de')} dataTestId="de-language-button"/>
                  <IconButton icon="fr-flag" color="none" onPress={() => setLanguage('fr')} dataTestId="fr-language-button"/>
                </div>
              </div>
            </OptionItem>
            <OptionItem>
              <div className="option-label">{t('options.dataManagement.label')}</div>
              <div className="option-buttons" onClick={clearNotes}>{t('options.dataManagement.clearAllNotes')}</div>
              <div className="option-buttons" onClick={clearCategories}>{t('options.dataManagement.clearAllCategories')}</div>
              <div className="option-buttons" onClick={clearData}>{t('options.dataManagement.clearData')}</div>
            </OptionItem>
          </div>
      </SideBarContainer>
      <Overlay ref={overlayRef} onClick={beforeClose}/>
    </>
  )
}
