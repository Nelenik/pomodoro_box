import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SettingsProvider } from './reducers_providers/SettingsProvider/SettingsProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>

      <App />
    </SettingsProvider>
  </React.StrictMode>
)

