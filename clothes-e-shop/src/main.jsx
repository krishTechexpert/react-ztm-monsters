import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{BrowserRouter} from 'react-router-dom'
import './index.scss'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store,persistor} from "./store/store.ts"
import { PersistGate } from 'redux-persist/integration/react'
import {Elements} from '@stripe/react-stripe-js'
import {stripePromise} from "./utils/stripe/stripe.util.js"
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div>loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
        <App />
        </Elements>
      </BrowserRouter>
    </PersistGate> 
  </Provider>
)
