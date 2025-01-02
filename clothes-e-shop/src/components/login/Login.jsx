import React,{useState} from 'react'
import {signInWithGooglePopup,createUserDocumentFromAuth,LoginUserWithEmailAndPassword} from "../../utils/firebase/firebase.config"
import FormInput from '../form-input/FormInput';
import "./login-styles.scss";
import Button,{BUTTON_TYPES_CLASSES} from "../button/Button";

const defaultFormFields = {
  email:'',
  password:'',
}

export default function Login() {
  const [formFields,setFormFields]=useState(defaultFormFields);
  const {email,password}=formFields;

  const handleChange = (event) => {
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

    const {user} = await signInWithGooglePopup()
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    try{
      const {user} = await LoginUserWithEmailAndPassword(email,password);
      setFormFields(defaultFormFields)
    }catch(error){
      switch(error.code){
        case 'auth/invalid-credential':
          alert('incorrect password and email')
          break
        
        case 'auth/user-not-found':
          alert('user not found')
          break

        default:
          console.log('user login failed',error)
    
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
        <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password} />
        <div className='btn-group'>
        <Button type="submit">Login</Button>
        <Button type="button" onClick={loginWithGoogle} buttonType={BUTTON_TYPES_CLASSES.google}>Login with Google</Button>
        </div>
      </form>
    </div>
  )
}
