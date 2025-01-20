import React from 'react'
import "./checkout-styles.scss"
import CheckoutItems from '../../components/checkout-items/CheckoutItems'
import { useSelector } from 'react-redux'

import {selectCartTotal,selectCartItems} from "../../store/cart-slice-old/cart.selector"
import PaymentForm from '../../components/payment-form/PaymentForm'


export default function Checkout() {
  const cartItems = useSelector(selectCartItems)
  const totalCartBalance = useSelector(selectCartTotal)
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
          <div className='header-block'>
            <span>Product</span>
          </div>
          <div className='header-block'>
            <span>Description</span>
          </div>
          <div className='header-block'>
            <span>Quantity</span>
          </div>
          <div className='header-block'>
            <span>Price</span>
          </div>
          <div className='header-block'>
            <span>Remove</span>
          </div>
      </div>
    
    
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItems key={cartItem.id} cartItem={cartItem} />
        )
      })}
      <span className='total'>Total:{totalCartBalance}</span>
      {totalCartBalance && <PaymentForm />}
    </div>
  )
}
