import { CATEGORY_ACTION_TYPES } from "../categories/category.types"
import { CART_ACTION_TYPES } from "./cart.types"


//helper Fn
function addCartItem(cartItems,product){
  // find if cartItems already contains product if found then increment quantity
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id)
  if(existingCartItem){
    return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem,quantity: cartItem.quantity+1} : cartItem )
  }

  //return new array with modified cartItems/new cart Item
  return [...cartItems,{...product,quantity:1}]
} 

function updateCartItem(cartItems,updateCartItem){
  //find the cartItem to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === updateCartItem.id)

  // check if quantity ==1 then remove cartItem from  cart
  if(existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== updateCartItem.id)
  }
  // reduce quantity and return cartItem
  return cartItems.map((cartItem) => {
    return cartItem.id === updateCartItem.id ? {...cartItem,quantity:cartItem.quantity -1} : cartItem
  })
}


export const addItemToCart = (cartItems,productToAdd) => {
  const newCartItems = addCartItem(cartItems,productToAdd)
  return {type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
}

export const updateItemToCart = (cartItems,cartItemToUpdate) => {
  const newCartItems = updateCartItem(cartItems,cartItemToUpdate)
  return {type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
}

export const removeItemToCart = (cartItems,cartItemToRemove) => {
  const newCartItems = cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  return {type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
}

export const setIsCartOpen = (boolean) => {
  return {type:CART_ACTION_TYPES.SET_IS_CART_OPEN,payload:boolean}
}
