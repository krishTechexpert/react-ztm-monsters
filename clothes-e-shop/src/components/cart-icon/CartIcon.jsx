import React,{useContext} from 'react'
import "./cart-icon-styles.scss";
import cartIcon from "../../assets/shopping-bag.svg";
import { CartContext } from '../../contexts/cartContext';
export default function CartIcon() {
  const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext)
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <img src={cartIcon} className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}
