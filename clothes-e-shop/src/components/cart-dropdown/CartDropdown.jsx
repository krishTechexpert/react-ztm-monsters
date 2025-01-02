import React,{useContext,useRef,useEffect} from 'react'
import {CartDropdownContainer,EmptyMessage,CartItemsLoop} from  "./cart-dropdown-styles"
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


  // to close cart dropdown outside click
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
    <CartDropdownContainer  ref={dropDownContainer}>
      <CartItemsLoop>
    {cartItems.length ?  cartItems.map((cartItem) => {
      return <CartItems key={cartItem.id} cartItem={cartItem} />
    }) : <EmptyMessage>Cart is empty</EmptyMessage>}


      </CartItemsLoop>
      <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>

    </CartDropdownContainer>
  )
}
