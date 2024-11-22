import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Credit from './Credit.jsx'
import { ModeToggle } from '../utils/theme-toggle.jsx'
import OSS from './assets/OSS.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeToggle/>
    <App />
    <Credit/>
<OSS/>

  </StrictMode>,
)
