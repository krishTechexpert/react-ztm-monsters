import React,{createContext,useState} from "react";

export const UserContext = createContext({
  currentUser: null, // Default user when no provider is present
  setCurrentUser: () => console.log("No provider, no action"), // No-op function
});

//ydi hum UserContext ko outside of UserProvider used kerty hai toh incase we can show some default value.. 

console.log("UserContext",UserContext)


function UserProvider({children}){
  const [currentUser,setCurrentUser]=useState(null);
  const value={currentUser,setCurrentUser}
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
