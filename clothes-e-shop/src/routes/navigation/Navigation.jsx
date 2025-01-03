import React,{useContext} from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../../assets/crown.svg"
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from  "./navigation.styles.jsx";
import { UserContext } from '../../contexts/userContext';
import {LogOutUser} from "../../utils/firebase/firebase.config";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import {CartContext} from "../../contexts/cartContext";
export default function Navigation() {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

  return (
    <>
    <NavigationContainer>
      <LogoContainer to='/'>
          <img src={logo} alt="Logo" />
      </LogoContainer>
      
      <NavLinks>
        <NavLink to='/shop'>Shop</NavLink>
        {currentUser ? <NavLink as="span" onClick={LogOutUser}>SignOut</NavLink>:
        <NavLink  to='/auth'>SignIn</NavLink>}
        <CartIcon />
      </NavLinks>
      {isCartOpen && <CartDropdown/>}
      </NavigationContainer>

    <Outlet/>
  </>
  )
}
