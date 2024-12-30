import React,{useContext,useRef,useEffect} from 'react'
import "./cart-dropdown-styles.scss"
import Button from '../button/Button'
import CartItems from "../cart-items/CartItems"
import { CartContext } from '../../contexts/cartContext';
import {useNavigate} from "react-router-dom"
export default function CartDropdown() {
  const {cartItems,setIsCartOpen} = useContext(CartContext)
  const dropDownContainer = useRef();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout')
  }


  // to clos cart dropdown outside click
  useEffect(() => {
    function listener(event){
      if(dropDownContainer.current.contains(event.target) || event.target.closest('.cart-icon-container')){
        return
      }
      setIsCartOpen(false)
    }
    document.addEventListener('mousedown',listener)
    return () => {
      console.log('remove cartDropdown from DOM')
      document.removeEventListener('mousedown',listener)
    }

  },[])

  return (
    <div className='cart-dropdown-container' ref={dropDownContainer}>
      <div className='cart-items'>
    {cartItems.length ?  cartItems.map((cartItem) => {
      return <CartItems key={cartItem.id} cartItem={cartItem} />
    }) : <p className='error-message'>Cart is empty</p>}


      </div>
      <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>

    </div>
  )
}
