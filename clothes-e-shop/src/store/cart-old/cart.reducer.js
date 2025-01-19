import {createSlice} from "@reduxjs/toolkit";
import {addCartItem,updateCartItem,removeCartItem} from "./cart.action"

export const CART_INITIAL_VALUE={
  isCartOpen:false,
  cartItems:[]
  // cartCount:0,
  // totalCartBalance:0
}


// good approach: reducers does not contains any bussiness logic.we want to just update state in reducers. business logic ko kisi other function s update ker do like updateCartItemReducers

export const cartSlice = createSlice({
  name:'cart',
  initialState:CART_INITIAL_VALUE,
  reducers:{
    addItemToCart(state,action){
      state.cartItems= addCartItem(state.cartItems,action.payload)
    },
    updateItemToCart(state,action) {
      state.cartItems = updateCartItem(state.cartItems,action.payload)
    },
    removeItemToCart(state,action) {
      state.cartItems=removeCartItem(state.cartItems,action.payload)
    },
    setIsCartOpen(state,action){
      state.isCartOpen=action.payload
    },
    
  }
})

export const {addItemToCart,updateItemToCart,removeItemToCart,setIsCartOpen,clearCartItem} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;