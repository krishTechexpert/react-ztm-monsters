import React,{createContext,useState,useEffect,useReducer} from "react";
import {onAuthStateChangedListener,createUserDocumentFromAuth, LogOutUser} from "../utils/firebase/firebase.config-backup";
export const UserContext = createContext({
  currentUser: null, // Default user when no provider is present
  setCurrentUser: () => console.log("No provider, no action"), // No-op function
});

// imp point to remember

//ydi hum UserContext ko outside of UserProvider used kerty hai toh incase we can show some default value.. 

// If UserProvider is part of a wrapper (e.g., BrowserRouter) that persists across pages, it won’t unmount when navigating between routes.

const userReducer = (state,action) => {
  const {type,payload}=action;
  console.log('Dispatch...',action)
  switch(type){
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser:payload
      }
    default:
      return state
  }
}

const INITIAL_STATE={
  currentUser:null
}


function UserProvider({children}){
  //const [currentUser,setCurrentUser]=useState(null);
  const [{currentUser},dispatch]=useReducer(userReducer,INITIAL_STATE)
  

  const setCurrentUser = (user) => {
    dispatch({type:'SET_CURRENT_USER',payload:user})
  }
  const value={currentUser,setCurrentUser}
  //onAuthStateChangedListener

  useEffect(() => {
    console.log("Effect: UserProvider mounted");

  const Unsubscribe =   onAuthStateChangedListener((user) => {
    console.log("Effect: Auth state changed:", user);
      if(user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
      
    })
    return () => {
      console.log('umMount...')
      Unsubscribe(); 
      
      //Let me clarify! The cleanup function in the useEffect runs only when the component unmounts, not when the state changes (like during a sign-out).

      // The cleanup function (unsubscribe()) is executed only when the UserProvider component unmounts.

      //This does not happen during a sign-out because the UserProvider remains mounted.

  };


  },[])


  return (<UserContext.Provider value={value}>
              {children}
        </UserContext.Provider>)
}

export default UserProvider;



// // Create a context with a default value
// export const UserContext = createContext({
//   currentUser: "Guest", // Default user when no provider is present
//   setCurrentUser: () => console.log("No provider, no action"), // No-op function
// });


// function Greeting() {
//   // Consume the context
//   const { currentUser } = useContext(UserContext);
//   return <h1>Welcome, {currentUser}!</h1>;
// }

// function App() {
//   return (
//     <div>
//       {/* Component without UserProvider */}
//       <Greeting />
//     </div>
//   );
// }

//The default value ensures the app works without errors, displaying: “Welcome, Guest!”.



//Conclusion:

// You don't have to provide a default value for createContext() if you're confident the Provider will always wrap your components. However, providing a default value is a best practice that:

// Prevents runtime errors in edge cases.
// Enhances code readability.
// Supports easier testing and reusability.
