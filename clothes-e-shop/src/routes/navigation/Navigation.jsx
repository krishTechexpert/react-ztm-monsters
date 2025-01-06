import React from 'react'
import { Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux';
import logo from "../../assets/crown.svg"
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from  "./navigation.styles.jsx";
import {LogOutUser} from "../../utils/firebase/firebase.config";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import {userSelector} from "../../store/user/user.selector.js"
import {selectIsCartOpen} from "../../store/cart/cart.selector"

export default function Navigation() {
  const currentUser=useSelector(userSelector)
  const isCartOpen =  useSelector(selectIsCartOpen)


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
