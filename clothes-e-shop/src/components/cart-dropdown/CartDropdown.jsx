import React,{useContext,useRef,useEffect} from 'react'
import {CartDropdownContainer,EmptyMessage,CartItemsLoop} from  "./cart-dropdown-styles"
import Button from '../button/Button'
import CartItems from "../cart-items/CartItems"
import { CartContext } from '../../contexts/cartContext';
import {useNavigate} from "react-router-dom"
import {CartIconContainer} from "../cart-icon/cart-icon-styles"
import { useSelector,useDispatch } from 'react-redux';
import {setIsCartOpen} from "../../store/cart/cart.action"
import {selectCartItems,selectIsCartOpen} from "../../store/cart/cart.selector"
export default function CartDropdown() {
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const isCartOpen =  useSelector(selectIsCartOpen)


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
      dispatch(setIsCartOpen(false))
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
