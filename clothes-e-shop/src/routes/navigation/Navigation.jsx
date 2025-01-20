import React from 'react'
import { Outlet } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import logo from "../../assets/crown.svg"
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from  "./navigation.styles.jsx";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import {userSelector} from "../../store/user-slice-old/user.selector.js"
import {selectIsCartOpen} from "../../store/cart-slice-old/cart.selector"
import {signOutStart} from "../../store/user-slice-old/user.reducer.js";
import {LogOutUser} from "../../utils/firebase/firebase.config-backup.js"

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
        {currentUser ? <NavLink as="span" onClick={() => dispatch(signOutStart(LogOutUser()))}>SignOut</NavLink>:
        <NavLink  to='/auth'>SignIn</NavLink>}
        <CartIcon />
      </NavLinks>
      {isCartOpen && <CartDropdown/>}
      </NavigationContainer>

    <Outlet/>
  </>
  )
}
