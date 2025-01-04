import React,{useEffect} from "react";
import {Routes,Route} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {onAuthStateChangedListener,createUserDocumentFromAuth,getCategoriesAndDocuments} from "./utils/firebase/firebase.config";


import Home from "./routes/home/Home"
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';

import {setCurrentUser} from "./store/user/user.action";

function App() {
  const dispatch=useDispatch(); 
  // very Imp note:  dispatch will never change it is always to going to be same reference. App component runs once .
  useEffect(() => {
  const Unsubscribe =  onAuthStateChangedListener((user) => {
      if(user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user))
    })
    return () => {
      Unsubscribe(); 
      
      //Let me clarify! The cleanup function in the useEffect runs only when the component unmounts, not when the state changes (like during a sign-out).

      // The cleanup function (unsubscribe()) is executed only when the UserProvider component unmounts.(means it will remove from DOM)

      //This does not happen during a sign-out because the UserProvider remains mounted.

  };
  },[dispatch])
  //Even though it’s not listed in the dependency array, it works fine because dispatch doesn’t change. because App component bar bar re-render nhi hoga..it render once so dispatch reference is same

//   Why Can You Omit dispatch?
// React-Redux ensures that dispatch is always the same. It doesn’t get recreated or change during the lifetime of your component. This means that even if you don’t add dispatch to the dependency array, your effect will still work as expected.


  return (
    
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* Child routes */}
        {/* index means "When someone visits the main route (/), show this component by default.(Home)" */}
        <Route index element={<Home />} />
        {/* shop nesting routing */}
        <Route path="shop/*" element={<Shop/>} /> 
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout/>} />
      </Route>
    </Routes>
  )
}

export default App
