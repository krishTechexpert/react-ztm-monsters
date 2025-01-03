import React,{useContext} from 'react'
import {CartIconContainer,ItemCount,ShoppingIcon} from  "./cart-icon-styles";
import cartIcon from "../../assets/shopping-bag.svg";
import { CartContext } from '../../contexts/cartContext';
export default function CartIcon() {
  const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext)
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon src={cartIcon}/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}
