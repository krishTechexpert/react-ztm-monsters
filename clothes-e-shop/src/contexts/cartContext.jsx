import React, {createContext,useState,useEffect} from 'react';

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

export const CartProvider = ({children}) => {
  const [isCartOpen,setIsCartOpen]=useState(false);
  const [cartItems,setCartItems]=useState([]);
  const [cartCount,setCartCount]=useState(0);
  const [totalCartBalance,setTotalCartBalance]=useState(0)
  const addItemToCart = (productToAdd) => {
    const updatedCartItem = addCartItem(cartItems,productToAdd)
    setCartItems(updatedCartItem)
  }

  const updateItemToCart = (cartItemToUpdate) => {
    const updatedCartItem = updateCartItem(cartItems,cartItemToUpdate)
    setCartItems(updatedCartItem)
  }

  const removeItemToCart = (cartItemToRemove) => {
    const updatedCartItem = cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    setCartItems(updatedCartItem)
  }

  // count total product in cart
  useEffect(() => {
    const newCartCount = cartItems.reduce((acc,currentElement) =>  acc + currentElement.quantity,0)
    const updateTotal  = cartItems.reduce((acc,cartItem) => acc+(cartItem.price*cartItem.quantity),0)
    setCartCount(newCartCount)
    setTotalCartBalance(updateTotal)
  },[cartItems])

  const value={isCartOpen,setIsCartOpen,cartItems,addItemToCart,cartCount,updateItemToCart,removeItemToCart,totalCartBalance}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}