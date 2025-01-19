import {AnyAction} from 'redux';
import {createSlice} from "@reduxjs/toolkit";
import {setCartItems,setIsCartOpen} from "./cart.action"
import { CART_ACTION_TYPES,CartItem } from "./cart.types";

export type CartState = {
  isCartOpen:boolean;
  cartItems:CartItem[]
}

export const CART_INITIAL_VALUE:CartState = {
  isCartOpen:false,
  cartItems:[]
}

// good approach: reducers does not contains any bussiness logic.we want to just update state in reducers. business logic ko kisi other function s update ker do like updateCartItemReducers

export const cartReducer = (state=CART_INITIAL_VALUE,action:AnyAction):CartState => {

  if(setIsCartOpen.match(action)){
    return {
      ...state,
      isCartOpen:action.payload
    };
  }

  if(setCartItems.match(action)){
    return {
      ...state,
      cartItems:action.payload
    };
  }

  return state;


  // switch(type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state,
  //       cartItems:payload
  //     };
  //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen:payload
  //     };
  //   default:
  //     return state;
  // }
}


// export const cartSlice = createSlice({
//   name:'cart',
//   initialState:CART_INITIAL_VALUE,
//   reducers:{
//     addItemToCart(state,action){
//       state.cartItems= addCartItem(state.cartItems,action.payload)
//     },
//     updateItemToCart(state,action) {
//       state.cartItems = updateCartItem(state.cartItems,action.payload)
//     },
//     removeItemToCart(state,action) {
//       state.cartItems=removeCartItem(state.cartItems,action.payload)
//     },
//     setIsCartOpen(state,action){
//       state.isCartOpen=action.payload
//     },
    
//   }
// })

// export const {addItemToCart,updateItemToCart,removeItemToCart,setIsCartOpen,clearCartItem} = cartSlice.actions;
// export const cartReducer = cartSlice.reducer;