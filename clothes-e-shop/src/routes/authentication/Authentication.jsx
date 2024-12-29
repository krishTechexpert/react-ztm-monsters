import React from 'react'
import SignUp from '../../components/signUP/SignUp'
import Login from '../../components/login/Login'
import "./authentication-styles.scss";

export default function Authentication() {

  return (

    <div className='auth-container'>
        <Login/>
        <SignUp/>
    </div>
  )
}

