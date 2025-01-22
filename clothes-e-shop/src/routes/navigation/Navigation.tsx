import React from 'react'
import { Outlet } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import logo from "../../assets/crown.svg"
import {NavigationContainer,LogoContainer,NavLinks,NavLink,SpanLink} from  "./navigation.styles";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import {selectCurrentUser} from "../../store/user/user.selector"
import {selectIsCartOpen} from "../../store/cart/cart.selector"
import {signOutStart} from "../../store/user/user.action";

export default function Navigation() {
  const dispatch = useDispatch()
  const currentUser=useSelector(selectCurrentUser)
  const isCartOpen =  useSelector(selectIsCartOpen)
  return (
    <>
    <NavigationContainer>
      <LogoContainer to='/'>
          <img src={logo} alt="Logo" />
      </LogoContainer>
      
      <NavLinks>
        <NavLink to='/shop'>Shop</NavLink>
        {currentUser ? <SpanLink as="span" onClick={() => dispatch(signOutStart())}>SignOut</SpanLink>:
        <NavLink  to='/auth'>SignIn</NavLink>}
        <CartIcon />
      </NavLinks>
      {isCartOpen && <CartDropdown/>}
      </NavigationContainer>

    <Outlet/>
  </>
  )
}
