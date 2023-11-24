import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import IconButton from './buttons/IconButton.tsx';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useUserStore} from '@/primary/stores/user.store.ts';
import Image from '@/primary/common/Image.tsx';

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
    line-height: 0;
  }

  .greeting-username {
    color: var(--color-primary);
    font-weight: bold;
    font-size: 2.5rem;
  }
`

export default function Header() {
  const {t} = useTranslation();
  const {openSidebar} = useAppStore()
  const {username, avatar} = useUserStore();
  return (
    <HeaderContainer>
      <div className="greeting-container">
        <div className="avatar"><Image src={avatar} alt="avatar"/></div>
        <div className="greeting-text">
          <p>{t('hello')}</p>
          <p className="greeting-username">{username}</p>
        </div>
      </div>
      <IconButton variant="borderless" dataTestId="menu-icon" icon="cog" onPress={openSidebar} iconSize="3"/>
    </HeaderContainer>
  )
}
