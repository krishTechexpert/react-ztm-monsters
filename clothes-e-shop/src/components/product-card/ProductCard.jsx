import React from 'react'
import "./product-card-styles.scss"
import Button,{BUTTON_TYPES_CLASSES} from "../button/Button";
import {addItemToCart} from "../../store/cart/cart.reducer";
import { useDispatch,useSelector } from 'react-redux';
import {selectCartItems} from "../../store/cart/cart.selector";
export default function ProductCard({product}) {
  const dispatch = useDispatch();
  const {name,price,imageUrl} = product;

  const handleCartItem = () => dispatch(addItemToCart(product))
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={handleCartItem}>Add To Card</Button>
    </div>
  )
}
