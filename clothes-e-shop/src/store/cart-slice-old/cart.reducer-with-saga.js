import {CART_ACTION_TYPES} from "./cart.types";
export const CART_INITIAL_VALUE={
  isCartOpen:false,
  cartItems:[]
  // cartCount:0,
  // totalCartBalance:0
}


// good approach: reducers does not contains any bussiness logic.we want to just update state in reducers. business logic ko kisi other function s update ker do like updateCartItemReducers

export const cartReducer = (state=CART_INITIAL_VALUE,action={}) => {
  const {type,payload}=action
  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
        return {
        ...state,
        cartItems:payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen:payload
      }
    default:
      return state

  }
}
