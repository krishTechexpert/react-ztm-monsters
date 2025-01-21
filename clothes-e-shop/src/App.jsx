import React,{useEffect} from "react";
import {Routes,Route} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";


import Home from "./routes/home/Home"
import Navigation from './routes/navigation/Navigation';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/Shop';
import Checkout from './routes/checkout/Checkout';

import {setCurrentUser} from "./store/user/user.action";
import {onAuthStateChangedListener,createUserDocumentFromAuth} from "./utils/firebase/firebase.config"


function App() {
  const dispatch=useDispatch(); 
  
  // Immutable middleware concept
  //const res = useSelector(state => state.user.test) // test:[3,2,1] or test:{a:1}
  //res.sort()
  //res.a=2; we are try to modify value of a directly inside store which give error
//res.sort()//middleware also help keta hai to prevent directly state ko chnage nhi ker sekty inside store , which give error such as Uncaught TypeError: Cannot assign to read only property '0' of object '[object Array]'


useEffect(() => {
  const Unsubscribe =  onAuthStateChangedListener((user) => {
      if(user) {
        createUserDocumentFromAuth(user)
      }
      
      dispatch(setCurrentUser(user)) //solution 1
      // if we passed payload which comes from firebase which is not string,object, but it is kind of non-serializable values such as Promises, Symbols, Maps/Sets, functions, or class instances then we show error
      //A non-serializable value was detected in an action, in the path: `payload`. Value: 
      //https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      //Avoid putting non-serializable values such as Promises, Symbols, Maps/Sets, functions, or class instances into the Redux store state or dispatched actions.
      //we can fixed this error to configure with our store
      //export const store = configureStore({
        //reducer:rootReducer,
        //middleware:middleWares // default redux-thunk middleware available in redux-toolkit
      
        // to fixed above error
        //A non-serializable value was detected in an action, in the path: `payload`. Value:
        //middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(middleWares)
        
        //which return default middlware and we can concat with our custom middleware as well
      //})
      
      // solution 2: 
      //const pickedUser = user && (({accessToken,email}) => ({accessToken,email}))(user)
      //dispatch(setCurrentUser(pickedUser))
      //same with regular function 
    //   function extractUserProperties(user) {
    //     if (!user) {
    //         return null; // If user is null or undefined, return null.
    //     }
        
    //     // Extract only accessToken and email properties from the user object.
    //     const { accessToken, email } = user;
    //     return { accessToken, email };
    // }
    
    // const pickedUser = extractUserProperties(user);
    
    })
    return () => {
      Unsubscribe(); 
  };
},[dispatch])

  // very Imp note:  dispatch will never change it is always to going to be same reference. App component runs once .
  // useEffect(() => {
  // const Unsubscribe =  onAuthStateChangedListener((user) => {
  //     if(user) {
  //       createUserDocumentFromAuth(user)
  //     }
  //     dispatch(setCurrentUser(user))
  //   })
  //   return () => {
  //     Unsubscribe(); 
      
  //     //Let me clarify! The cleanup function in the useEffect runs only when the component unmounts, not when the state changes (like during a sign-out).

  //     // The cleanup function (unsubscribe()) is executed only when the UserProvider component unmounts.(means it will remove from DOM)

  //     //This does not happen during a sign-out because the UserProvider remains mounted.

  // };
  // },[dispatch])
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
