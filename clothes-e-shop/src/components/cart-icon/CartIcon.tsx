import React from 'react'
import {CartIconContainer,ItemCount} from  "./cart-icon-styles";
// for svg icon..check custom.d.ts file
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import CartSvgIcon from "../../assets/shopping-bag.svg";


import {setIsCartOpen} from "../../store/cart/cart.action"
import { useDispatch,useSelector } from 'react-redux';
import {selectIsCartOpen,selectCartCount} from "../../store/cart/cart.selector"
export default function CartIcon() {
  const dispatch = useDispatch()
  const isCartOpen =  useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  /**
   * to add svg icon in typsescript we need some setting in tsconfig file
   *   "include": ["src","src/custom.d.ts"]

  and create new fuile custom.d.ts which contain
     declare module "*.svg"{
  import React = require("react");
  export const ReactComponent = React.FC<React.SVGProps<SVGSVGElement>>
  const src:string;
  export default src;
}
   * 
   */

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen))
  }
  return (
    <CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
      <img src={CartSvgIcon} className='shopping-icon'/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}
