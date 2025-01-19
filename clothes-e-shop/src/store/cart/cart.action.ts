import { CART_ACTION_TYPES,CartItem } from "./cart.types"
import { createAction,withMatcher,Action,ActionWithPayload } from "../../utils/reducer/reducer.utils"
import { CategoryItem } from "../categories/category.types"
import CartItems from "../../components/cart-items/CartItems"

//helper Fn
export function addCartItem(cartItems:CartItem[],product:CategoryItem):CartItem[]{
  // find if cartItems already contains product if found then increment quantity
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id)
  if(existingCartItem){
    return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem,quantity: cartItem.quantity+1} : cartItem )
  }

  //return new array with modified cartItems/new cart Item
  return [...cartItems,{...product,quantity:1}]
} 

export function updateCartItem(cartItems:CartItem[],updateCartItem:CartItem):CartItem[]{
  //find the cartItem to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === updateCartItem.id)

  // check if quantity ==1 then remove cartItem from  cart
  if(existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== updateCartItem.id)
  }
  // reduce quantity and return cartItem
  return cartItems.map((cartItem) => {
    return cartItem.id === updateCartItem.id ? {...cartItem,quantity:cartItem.quantity -1} : cartItem
  })
}

export function removeCartItem(cartItems:CartItem[],removeItem:CartItem):CartItem[]{
  return cartItems.filter(cartItem => cartItem.id !== removeItem.id)
}
//type 
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS,CartItem[]>

// without redux tookoit below code
//actions
export const setIsCartOpen = withMatcher((boolean:boolean):SetIsCartOpen => {
  return  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean)
   //return {type:CART_ACTION_TYPES.SET_IS_CART_OPEN,payload:boolean}
 })

 //setIsCartOpen() which return {type,match(action:AnyAction) {
  //return action.type === type; // Check if the action's type matches}

  //withMatcher accept actionCreator function
 export const setCartItems = withMatcher((CartItems:CartItem[]):SetCartItems => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,CartItems)
  //return {type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
 })

 export const addItemToCart = (cartItems:CartItem[],productToAdd:CategoryItem) => {
  const newCartItems = addCartItem(cartItems,productToAdd)
  return setCartItems(newCartItems)
}

export const updateItemToCart = (cartItems:CartItem[],cartItemToUpdate:CartItem) => {
  const newCartItems = updateCartItem(cartItems,cartItemToUpdate)
  return setCartItems(newCartItems)
}

export const removeItemToCart = (cartItems:CartItem[],cartItemToRemove:CartItem) => {
  const newCartItems = cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  return setCartItems(newCartItems)
}

