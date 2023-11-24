import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {changeLanguage} from 'i18next';
import {mockAppStore, mockedi18Next, mockUserService} from '@tests/fixtures/common.mocks.ts';
import SettingsDrawer from '@/primary/common/drawers/SettingsDrawer.tsx';
import * as useAppStore from '@/primary/stores/app.store.ts';
import gsap from 'gsap';

vi.mock('gsap', () => ({
  gsap : {
    timeline: vi.fn().mockReturnValue({
      to: vi.fn()
    })
  }
}))

vi.mock('i18next', () => ({
  changeLanguage: vi.fn()
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => mockedi18Next
}))

const renderComponent = () => {
  return render(<SettingsDrawer />);
}

const userService = mockUserService();
vi.mock('@/domain/hooks/UseInject.ts', () => ({
  useInject: vi.fn((() => userService))
}))

describe('Settings component', () => {
  describe('Settings behaviour', () => {
    it('should close the settings drawer on close button click', async () => {
      const closeSidebar = vi.fn();
      vi.spyOn(useAppStore, 'useAppStore').mockImplementation(() => mockAppStore({
        closeSidebar,
      }));
      const {getByTestId} = renderComponent();
      const settingsDrawer = screen.queryByTestId('settings-drawer')
      const closeButton = getByTestId('close-sidebar-button')
      fireEvent.click(closeButton);
      await waitFor(() => {
        expect(gsap.timeline).toHaveBeenCalled();
      });
      expect(closeSidebar).toHaveBeenCalled();
      expect(settingsDrawer).not.toBeInTheDocument()
    });
  });

  describe('User form', () => {
    it('should render use infos', () => {
      const {getByTestId} = renderComponent();
      const avatar = getByTestId('user-avatar');
      const input = getByTestId('user-input');
      const saveButton = getByTestId('user-save-button');
      expect(avatar).toBeDefined();
      expect(input).toBeDefined();
      expect(saveButton).toBeDefined();
    });
  })
  describe('Language change', () => {
    it('should set new language on press', () => {
      const {getByTestId} = renderComponent();
      const enButton = getByTestId('en-language-button')
      fireEvent.click(enButton);
      expect(changeLanguage).toHaveBeenCalledWith('en')

      const deButton = getByTestId('de-language-button')
      fireEvent.click(deButton);
      expect(changeLanguage).toHaveBeenCalledWith('de')
    });
  });
});