import React,{useContext} from 'react'
import "./checkout-items-styles.scss";
import { CartContext } from '../../contexts/cartContext';
export default function CheckoutItems({cartItem}) {
  const {addItemToCart,updateItemToCart,removeItemToCart} = useContext(CartContext)

  const {name,imageUrl,price,quantity} = cartItem;

  const addItemHandler = ()=> addItemToCart(cartItem)
  const updateItemHandler = () => updateItemToCart(cartItem)
  const removeItemHandler = () => removeItemToCart(cartItem)

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

