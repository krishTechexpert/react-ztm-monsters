import React,{useContext} from 'react'
import "./cart-dropdown-styles.scss"
import Button from '../button/Button'
import CartItems from "../cart-items/CartItems"
import { CartContext } from '../../contexts/cartContext'
export default function CartDropdown() {
  const {cartItems} = useContext(CartContext)
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
    {cartItems.length ?  cartItems.map((cartItem) => {
      return <CartItems key={cartItem.id} cartItem={cartItem} />
    }) : <p className='error-message'>Cart is empty</p>}


      </div>
      <Button>GO TO CHECKOUT</Button>

    </div>
  )
}
