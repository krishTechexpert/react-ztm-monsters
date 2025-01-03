import React, {createContext,useState,useEffect,useReducer} from 'react';

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

export const CartContext = createContext({
  isCartOpen:false,
  setIsCartOpen:() => {},
  cartItems:[],
  addItemToCart:(product) => {},
  updateItemToCart:(cartItem) => {},
  removeItemToCart:(cartItem) => {},
  cartCount:0,
  totalCartBalance:0
})

const INITIAL_CART_VALUE={
  isCartOpen:false,
  cartItems:[],
  cartCount:0,
  totalCartBalance:0
}


// good approach: reducers does not contains any bussiness logic.we want to just update state in reducers. business logic ko kisi other function s update ker do like updateCartItemReducers
const cartReducer = (state,action) => {
  const {type,payload}=action
  switch(type){
    case 'SET_CART_ITEMS':
        return {
        ...state,
        ...payload
      }
    case 'CART_OPEN':
      return {
        ...state,
        isCartOpen:payload
      }
    default:
      return state

  }
}

export const CartProvider = ({children}) => {
  //const [isCartOpen,setIsCartOpen]=useState(false);
  //const [cartItems,setCartItems]=useState([]);
  //const [cartCount,setCartCount]=useState(0);
  //const [totalCartBalance,setTotalCartBalance]=useState(0)
  
  const [{isCartOpen,cartItems,cartCount,totalCartBalance},dispatch]=useReducer(cartReducer,INITIAL_CART_VALUE)

  // this is our bussines login to handle cart updation,remove,add
  const updateCartItemReducers = (newCartItems) => {

    const newCartCount = newCartItems.reduce((acc,currentElement) =>  acc + currentElement.quantity,0)

    const newCartTotal  = newCartItems.reduce((acc,cartItem) => acc+(cartItem.price*cartItem.quantity),0)

    dispatch({type:'SET_CART_ITEMS',payload:{cartCount:newCartCount,totalCartBalance:newCartTotal,cartItems:newCartItems}})

    /*
      generate newCartTotal

      generate newCartCount

      send dispatch new action with payload = {
        newCartItems,
        newCartTotal,
        newCartCount
      }
    
    */ 
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd)
    updateCartItemReducers(newCartItems)
  }

  const updateItemToCart = (cartItemToUpdate) => {
    const newCartItems = updateCartItem(cartItems,cartItemToUpdate)
    updateCartItemReducers(newCartItems)
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    updateCartItemReducers(newCartItems)
  }

  const setIsCartOpen = (value) => {
    dispatch({type:'CART_OPEN',payload:value})
  }

  // count total product in cart
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((acc,currentElement) =>  acc + currentElement.quantity,0)
  //   const updateTotal  = cartItems.reduce((acc,cartItem) => acc+(cartItem.price*cartItem.quantity),0)
  //   setCartCount(newCartCount)
  //   setTotalCartBalance(updateTotal)
  // },[cartItems])



  const value={isCartOpen,setIsCartOpen,cartItems,addItemToCart,cartCount,updateItemToCart,removeItemToCart,totalCartBalance}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}