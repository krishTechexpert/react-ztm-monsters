import React,{useState} from 'react'
import {createUserDocumentFromAuth,createAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.config"
import FormInput from '../form-input/FormInput';

const defaultFormFields = {
  displayName:'',
  email:'',
  password:'',
  confirmPassword:''
}

export default function SignUp() {
  const [formFields,setFormFields]=useState(defaultFormFields);
  const {displayName,email,password,confirmPassword}=formFields;

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

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert('Password does not matched')
      return;
    }
    try{
      const {user} = await createAuthUserWithEmailAndPassword(email,password);
      await createUserDocumentFromAuth(user,{displayName})
      setFormFields(defaultFormFields)
    }catch(error){
      if(error.code === 'auth/email-already-in-use') {
          alert('Email already in use so can not create user')
          return;
      }else {
        console.log('user creation failed',error)

      }
    }
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>

      {/* <FormInput label="Display Name" otherProps = {{
        type:'text',
        required:true,
        name:'displayName',
        onChange:handleChange,
        value:displayName

      }} /> */}


        <FormInput label="Display Name" type="text" required name="displayName" onChange={handleChange} value={displayName} />
        <FormInput label="Email" type="email" required  name="email" onChange={handleChange} value={email} />
        <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password} />
        <FormInput label="Confirm Password" type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
