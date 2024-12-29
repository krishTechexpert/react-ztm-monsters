import React,{useContext} from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from "../../assets/crown.svg"
import "./navigation.styles.scss";
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
    <div className='navigation'>
      <Link className='logo-container' to='/'>
          <img src={logo} alt="Logo" className="logo" />
      </Link>
      
      <div className='nav-links-container'>
        <Link className='nav-link' to='/shop'>Shop</Link>
        {currentUser ? <span className='nav-link' onClick={LogOutUser}>SignOut</span>:
        <Link className='nav-link' to='/auth'>SignIn</Link>}
        <CartIcon />
      </div>
      {isCartOpen && <CartDropdown/>}
      </div>

    <Outlet/>
  </>
  )
}
