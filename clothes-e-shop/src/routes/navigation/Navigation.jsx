import React,{useContext} from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from "../../assets/crown.svg"
import "./navigation.styles.scss";
import { UserContext } from '../../contexts/userContext';
import {LogOutUser} from "../../utils/firebase/firebase.config";
export default function Navigation() {
  const {currentUser,setCurrentUser} = useContext(UserContext)
  console.log("currentUser=",currentUser)
  
  const signOutHandler = async () => {
    await LogOutUser()
    setCurrentUser(null)
  }

  return (
    <>
    <div className='navigation'>
      <Link className='logo-container' to='/'>
          <img src={logo} alt="Logo" className="logo" />
      </Link>
      
      <div className='nav-links-container'>
        <Link className='nav-link' to='/shop'>Shop</Link>
        {currentUser ? <span className='nav-link' onClick={signOutHandler}>SignOut</span>:
        <Link className='nav-link' to='/signin'>SignIn</Link>}

      </div>
      </div>

    <Outlet/>
  </>
  )
}
