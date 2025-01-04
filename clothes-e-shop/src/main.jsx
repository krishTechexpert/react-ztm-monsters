import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{BrowserRouter} from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import { CartProvider } from './contexts/cartContext.jsx'
import {Provider} from 'react-redux'
import {store} from "./store/store.js"
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
    </BrowserRouter>
  </Provider>
)
