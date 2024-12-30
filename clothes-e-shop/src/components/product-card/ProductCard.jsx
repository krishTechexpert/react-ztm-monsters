import React,{useContext} from 'react'
import "./product-card-styles.scss"
import Button from "../button/Button";
import { CartContext } from '../../contexts/cartContext'

export default function ProductCard({product}) {
  const {name,price,imageUrl} = product;
  const {addItemToCart} = useContext(CartContext)

  const handleCartItem = () => addItemToCart(product)
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={handleCartItem}>Add To Card</Button>
    </div>
  )
}
