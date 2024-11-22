import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'
import Credit from './Credit.js'
import { ModeToggle } from '../utils/theme-toggle.js'
import OSS from './assets/OSS.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeToggle/>
    <App />
    <Credit/>
<OSS/>

  </StrictMode>,
)
