import React,{FormEvent,ChangeEvent, useState} from 'react'
import {signInWithGooglePopup,createUserDocumentFromAuth,LoginUserWithEmailAndPassword} from "../../utils/firebase/firebase.config"
import { AuthError,AuthErrorCodes } from 'firebase/auth';
import FormInput from '../form-input/FormInput';
import "./login-styles.scss";
import Button,{BUTTON_TYPES_CLASSES} from "../button/Button";
import { useDispatch } from 'react-redux';
import {googleSignInStart,emailSignInStart} from "../../store/user/user.action"
const defaultFormFields = {
  email:'',
  password:'',
}

export default function Login() {
  const dispatch = useDispatch()
  const [formFields,setFormFields]=useState(defaultFormFields);
  const {email,password}=formFields;

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {name,value}=event.target;
    setFormFields((prev) => {
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const loginWithGoogle = async() => {
        // 1. Use signInWithPopup Instead of signInWithRedirect
        
        // If possible, prefer signInWithPopup, as it does not involve cross-origin redirects. This is the recommended approach for most apps:
        
        //Redirecting to a different origin (domain) for authentication, then back to your app, can be problematic under modern browser policies.
        
        // The warning about "Cross-origin redirect sign-in is no longer supported in many browsers" means that certain browsers (like Chrome) have started to enforce stricter security policies, which can block cross-origin redirects for authentication.

    //const {user} = await signInWithGooglePopup()// for I used redux-thunk
    //dispatch(setCurrentUser(user))
    dispatch(googleSignInStart()) // redux-saga used here
  }

  const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try{
      //const {user} = await LoginUserWithEmailAndPassword(email,password); //for redux-thunk
      dispatch(emailSignInStart(email,password)) // redux saga
      setFormFields(defaultFormFields)
    }catch(error){
      const authError = error as AuthError;

      switch(authError.code){
        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
          alert('incorrect password and email')
          break
        
        case AuthErrorCodes.APP_NOT_AUTHORIZED:
          alert('user not found')
          break

        default:
          console.log('user login failed',authError)
    
      }
      
      
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>already have an account?</h2>
      <span>Login with your email and password</span>
      <form onSubmit={handleSubmit}>

      {/* <FormInput label="Display Name" otherProps = {{
        type:'text',
        required:true,
        name:'displayName',
        onChange:handleChange,
        value:displayName

      }} /> */}
        <FormInput label="Email" type="email" required  name="email" onChange={handleChange} value={email} />
        <FormInput  label="Password" type="password" required name="password" onChange={handleChange} value={password} />
        <div className='btn-group'>
        <Button type="submit">Login</Button>
        <Button type="button" onClick={loginWithGoogle} buttonType={BUTTON_TYPES_CLASSES.google}>Login with Google</Button>
        </div>
      </form>
    </div>
  )
}
