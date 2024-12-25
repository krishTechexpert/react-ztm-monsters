import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from "../../assets/crown.svg"
import "./navigation.styles.scss";
export default function Navigation() {
  return (
    <>
    <div className='navigation'>
      <Link className='logo-container' to='/'>
          <img src={logo} alt="Logo" className="logo" />
      </Link>
      
      <div className='nav-links-container'>
        <Link className='nav-link' to='/shop'>Shop</Link>
        <Link className='nav-link' to='/signin'>SignIn</Link>

      </div>
      </div>

    <Outlet/>
  </>
  )
}
