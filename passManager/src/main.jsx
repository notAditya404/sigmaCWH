import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppMongo from './AppMongo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppMongo />
  </StrictMode>,
)
