import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppMongo from './AppMongo'
import router from './utils/Router.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
