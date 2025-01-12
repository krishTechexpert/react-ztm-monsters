import React from 'react'
import "./checkout-items-styles.scss";
import {addItemToCart,removeItemToCart,updateItemToCart} from "../../store/cart/cart.reducer";
import { useDispatch,useSelector } from 'react-redux'

export default function CheckoutItems({cartItem}) {
  const dispatch = useDispatch();


  const {name,imageUrl,price,quantity} = cartItem;

  const addItemHandler = ()=> dispatch(addItemToCart(cartItem))
  const updateItemHandler = () => dispatch(updateItemToCart(cartItem))
  const removeItemHandler = () => dispatch(removeItemToCart(cartItem))

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

