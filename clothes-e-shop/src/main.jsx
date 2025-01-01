import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{BrowserRouter} from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import UserProvider from "./contexts/userContext"
import { ProductsCategoriesProvider } from './contexts/productsContext.jsx'
import { CartProvider } from './contexts/cartContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserProvider>
        <ProductsCategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsCategoriesProvider>
      </UserProvider>
    </BrowserRouter>
)
