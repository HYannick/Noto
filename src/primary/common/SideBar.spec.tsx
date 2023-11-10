// import SideBar from './SideBar.tsx';
// import {fireEvent, render} from '@testing-library/react';
// import {describe, expect, it, vi} from 'vitest';
// import AppContext from './contexts/AppContext.ts';
// import {changeLanguage} from 'i18next';
// import {mockAppContextValues, mockedi18Next} from '../../../tests/fixtures/common.mocks.ts';
//
// const appContext =  mockAppContextValues({sidebarOpen: false})
//
// vi.mock('i18next', () => ({
//   changeLanguage: vi.fn()
// }))
//
// vi.mock('react-i18next', () => ({
//   useTranslation: () => mockedi18Next
// }))
//
// const renderComponent = () => {
//   return render(
//     <AppContext.Provider value={appContext}>
//       <SideBar/>
//     </AppContext.Provider>
//   );
// }
//
// describe('Sidebar component', () => {
//   describe('Sidebar behaviour', () => {
//     it('should close the sidebar on close button click', () => {
//       const {getByTestId} = renderComponent();
//       const closeButton = getByTestId('close-sidebar-button')
//       fireEvent.click(closeButton);
//       expect(appContext.setSidebarState).toHaveBeenCalledWith(false)
//     });
//   });
//
//   describe('User form', () => {
//     it('should render use infos', () => {
//       const {getByTestId} = renderComponent();
//       const avatar = getByTestId('user-avatar');
//       const input = getByTestId('user-input');
//       const saveButton = getByTestId('user-save-button');
//       expect(avatar).toBeDefined();
//       expect(input).toBeDefined();
//       expect(saveButton).toBeDefined();
//     });
//   })
//   describe('Language change', () => {
//     it('should set new language on press', () => {
//       const {getByTestId} = renderComponent();
//       const enButton = getByTestId('en-language-button')
//       fireEvent.click(enButton);
//       expect(changeLanguage).toHaveBeenCalledWith('en')
//
//       const deButton = getByTestId('de-language-button')
//       fireEvent.click(deButton);
//       expect(changeLanguage).toHaveBeenCalledWith('de')
//     });
//   });
// });