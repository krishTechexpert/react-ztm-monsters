import React from 'react'
import { Outlet } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import logo from "../../assets/crown.svg"
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from  "./navigation.styles.jsx";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import {userSelector} from "../../store/user/user.selector.js"
import {selectIsCartOpen} from "../../store/cart/cart.selector"
import {signOutStart} from "../../store/user/user.action.js";


export default function Navigation() {
  const dispatch = useDispatch()
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
        {currentUser ? <NavLink as="span" onClick={() => dispatch(signOutStart())}>SignOut</NavLink>:
        <NavLink  to='/auth'>SignIn</NavLink>}
        <CartIcon />
      </NavLinks>
      {isCartOpen && <CartDropdown/>}
      </NavigationContainer>

    <Outlet/>
  </>
  )
}
