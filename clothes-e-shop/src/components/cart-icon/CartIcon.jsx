import React from 'react'
import {CartIconContainer,ItemCount,ShoppingIcon} from  "./cart-icon-styles";
import cartIcon from "../../assets/shopping-bag.svg";
import {setIsCartOpen} from "../../store/cart/cart.reducer"
import { useDispatch,useSelector } from 'react-redux';
import {selectIsCartOpen,selectCartCount} from "../../store/cart/cart.selector"
export default function CartIcon() {
  const dispatch = useDispatch()
  const isCartOpen =  useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen))
  }
  return (
    <CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon src={cartIcon}/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}
