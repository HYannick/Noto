import {describe, it, expect, vi} from 'vitest';
import {render} from '@testing-library/react';
import Header from '../Header.tsx';
import {mockedi18Next} from '@tests/fixtures/common.mocks.ts';
import {AppStoreState} from '@/primary/stores/app.store.ts';
import {UserStoreState} from '@/primary/stores/user.store.ts';
import * as useUserStore from '@/primary/stores/user.store.ts';
import '@testing-library/jest-dom';
import {ContainerProvider} from '../ContainerProvider.tsx';
import {IContainer} from '@/domain/IContainer.ts';

vi.mock('react-i18next', () => ({
  useTranslation: () => mockedi18Next
}))
vi.mock('../Image.tsx', () => ({
  default: () => <img src="" alt="mocked-image" />,
}));

export const mockAppStore = (opts?: Partial<AppStoreState>): AppStoreState => ({
  sidebarOpen: false,
  createEditNoteOpen: false,
  openSidebar: vi.fn(),
  closeSidebar: vi.fn(),
  openNoteEdit: vi.fn(),
  closeNoteEdit: vi.fn(),
  ...opts
});

export const mockUserStore = (opts?: Partial<UserStoreState>): UserStoreState => ({
  username: '',
  avatar: null,
  setUserInfos: vi.fn(),
  ...opts
});

const mockContainer = (opts?: Partial<IContainer>): IContainer => ({
  registry: {},
  resolve: vi.fn(),
  ...opts
});
describe('Header', () => {
  it('renders correctly with user data', () => {
    vi.spyOn(useUserStore, 'useUserStore').mockImplementation(() => (
      mockUserStore({
        username: 'Mokoto Kusanagi',
        avatar: new Blob(),
      }))
    );
    const {getByText} = render(<ContainerProvider container={mockContainer()}><Header/></ContainerProvider>);
    // Assert that the username is rendered
    expect(getByText('Mokoto Kusanagi')).toBeInTheDocument();
  });
});