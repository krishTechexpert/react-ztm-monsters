import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{BrowserRouter} from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import UserProvider from "./contexts/userContext"

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
)
