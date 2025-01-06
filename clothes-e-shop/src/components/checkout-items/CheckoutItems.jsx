import React from 'react'
import "./checkout-items-styles.scss";
import {addItemToCart,removeItemToCart,updateItemToCart} from "../../store/cart/cart.action";
import { useDispatch,useSelector } from 'react-redux'
import {selectCartItems} from "../../store/cart/cart.selector";

export default function CheckoutItems({cartItem}) {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems)

  const {name,imageUrl,price,quantity} = cartItem;

  const addItemHandler = ()=> dispatch(addItemToCart(cartItems,cartItem))
  const updateItemHandler = () => dispatch(updateItemToCart(cartItems,cartItem))
  const removeItemHandler = () => dispatch(removeItemToCart(cartItems,cartItem))

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={updateItemHandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
    </div>
  )
}

