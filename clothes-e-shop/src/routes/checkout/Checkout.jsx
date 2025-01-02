import React,{useContext} from 'react'
import { CartContext } from '../../contexts/cartContext'
import "./checkout-styles.scss"
import CheckoutItems from '../../components/checkout-items/CheckoutItems'


export default function Checkout() {
  const {cartItems,addItemToCart,removeItemToCart,totalCartBalance} = useContext(CartContext)
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
    </div>
  )
}