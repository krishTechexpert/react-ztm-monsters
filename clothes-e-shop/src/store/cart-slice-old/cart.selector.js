import { createSelector } from "reselect";

//cart state in store
// state = {
//   cart: {
//     cartItems:[],
//      isCartOpen:false
//   },

// }
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState], // if input change then selectCartState output will send to as cart input argument here 
  (cart)=> cart.cartItems
)

export const selectIsCartOpen = createSelector(
  [selectCartState],
  (cart) => cart.isCartOpen
)

// we will calculate cart quantity and total based on cartItems that's why we don't put as in cart state such as const INITIAL_CART_VALUE={ isCartOpen:false,cartItems:[],cartCount:0,totalCartBalance:0
// }
export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total,cartItem) => total + cartItem.quantity,
    0
  )
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total,cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
)

