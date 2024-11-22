import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Credit from './Credit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Credit/>


  </StrictMode>,
)
