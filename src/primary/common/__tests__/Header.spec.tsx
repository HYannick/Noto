import {describe, it, expect, vi} from 'vitest';
import {fireEvent, render} from '@testing-library/react';
import Header from '../Header.tsx';
import * as useAppStore from '@/primary/stores/app.store.ts';
import * as useUserStore from '@/primary/stores/user.store.ts';
import '@testing-library/jest-dom';
import {ContainerProvider} from '../ContainerProvider.tsx';
import {mockAppStore, mockContainer, mockedi18Next, mockUserStore} from '@tests/fixtures/common.mocks.ts';

vi.mock('react-i18next', () => ({
  useTranslation: () => mockedi18Next
}))
vi.mock('../Image.tsx', () => ({
  default: () => <img src="" alt="mocked-image" />,
}));

const renderComponent = () => {
  return render(<ContainerProvider container={mockContainer()}><Header/></ContainerProvider>);
}
describe('Header', () => {
  it('renders correctly with user data', () => {
    vi.spyOn(useUserStore, 'useUserStore').mockImplementation(() => mockUserStore({
      username: 'Mokoto Kusanagi',
      avatar: new Blob(),
    })
    );

    const {getByText} = renderComponent();

    expect(getByText('Mokoto Kusanagi')).toBeInTheDocument();
  });

  it('should trigger openSidebar on IconButton menu press', async () => {
    const appStore =  mockAppStore();
    vi.spyOn(useAppStore, 'useAppStore').mockImplementation(() => appStore);

    const {getByTestId} = renderComponent();

    const button = getByTestId('menu-icon');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(appStore.openSidebar).toHaveBeenCalled();
  });
});