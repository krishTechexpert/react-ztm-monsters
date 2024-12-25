import React from 'react'

import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/firebase/firebase.config'
import SignUp from '../../components/signUP/SignUp'

export default function SignIn() {
  

  const logGoogleUser = async() => {

    // 1. Use signInWithPopup Instead of signInWithRedirect
    // If possible, prefer signInWithPopup, as it does not involve cross-origin redirects. This is the recommended approach for most apps:


    //Redirecting to a different origin (domain) for authentication, then back to your app, can be problematic under modern browser policies.


    // The warning about "Cross-origin redirect sign-in is no longer supported in many browsers" means that certain browsers (like Chrome) have started to enforce stricter security policies, which can block cross-origin redirects for authentication.

    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  
  return (
    <div>
      <h1>SignIn page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <SignUp/>
    </div>
  )
}
