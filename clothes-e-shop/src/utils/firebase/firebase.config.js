import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCUk9uy3H3HIdlCJUCDqh2TrpxTkmirX7Q",
  authDomain: "clothes-eshop-db-a9fa3.firebaseapp.com",
  projectId: "clothes-eshop-db-a9fa3",
  storageBucket: "clothes-eshop-db-a9fa3.firebasestorage.app",
  messagingSenderId: "368731091062",
  appId: "1:368731091062:web:47b66ddc87b97d3638af57",
  measurementId: "G-688H9YND8W"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider=new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt:"select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)

//const analytics = getAnalytics(firebaseApp);

export const db = getFirestore()

export const createUserDocumentFromAuth = async(userAuth,additionalUserInfo={}) => {
  if(!userAuth) return;

  const userDocRef = doc(db,'users',userAuth.uid) // users:collection name,uid will get after login by google provider signIN
  
  //console.log("userDocRef=",userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  //console.log(userSnapshot.exists())// check user exist or not


  //if user data does not exist
  // create / set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef,{
        displayName,email,createdAt,
        ...additionalUserInfo
      })
    }catch(error){
      console.log('error creating the user',error.message)
    }
  }

  // if user data exist then return userDocRef
  return userDocRef
  //here finally we create user Collection in firebase
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    try{
    const res= await createUserWithEmailAndPassword(auth,email,password)
    return res;

    }catch(error) {
      throw error;
    }
}

export const LoginUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  try{
  return  await signInWithEmailAndPassword(auth,email,password)

  }catch(error) {
    throw error;
  }
}