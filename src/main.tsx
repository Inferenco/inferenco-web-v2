import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initI18n } from './i18n'
import './index.css'
import App from './App.tsx'

// Await i18next before the first render: the English catalogue is eager and
// any detected non-English catalogue is loaded here, so the first paint is
// already localized and no translation key flashes.
await initI18n()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
