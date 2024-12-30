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

export const CartContext = createContext({
  isCartOpen:false,
  setIsCartOpen:() => {},
  cartItems:[],
  addItemToCart:(item) => {},
  cartCount:0
})

export const CartProvider = ({children}) => {
  const [isCartOpen,setIsCartOpen]=useState(false);
  const [cartItems,setCartItems]=useState([]);
  const [cartCount,setCartCount]=useState(0);
  const addItemToCart = (product) => {
    const updatedCartItem = addCartItem(cartItems,product)
    setCartItems(updatedCartItem)
  }
  // count total product in cart
  useEffect(() => {
    const newCartCount = cartItems.reduce((acc,currentElement) =>  acc + currentElement.quantity,0)
    setCartCount(newCartCount)
  },[cartItems])

  const value={isCartOpen,setIsCartOpen,cartItems,addItemToCart,cartCount}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}