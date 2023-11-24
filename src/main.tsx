import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './primary/App.tsx'
import '@assets/style/index.css'
import {initI18n} from './domain/translations/i18n.ts';

initI18n();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
