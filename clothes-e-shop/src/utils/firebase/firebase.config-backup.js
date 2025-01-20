import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc,collection, writeBatch,query,getDocs} from "firebase/firestore"

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

// insert data into collection
export const addCollectionAndDocuments = async(collectionKey,objectsToAdd) => {
  //got collection reference
  const collectionRef =  collection(db,collectionKey)
  const batch = writeBatch(db) // atomic write operation

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef,object.title.toLowerCase())
    batch.set(docRef,object)
  })

  await batch.commit();
  console.log('done')
}
//fetch document from collection
export const getCategoriesAndDocuments = async() => {
  const collectionRef =  collection(db,'categories')
  const q = query(collectionRef)
  const querySnapshot= await getDocs(q)
  // send original api data to categoriesReducer  without any transforming
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data()) //[{title:'hats',items:[]}]

  // this logic put in category selector [reason:   // we can transform actual data into categoriesReducer]
  // const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
  //   const {title,items} = docSnapshot.data();
  //   acc[title.toLowerCase()]=items;
  //   return acc;
  // },{})
  // return categoryMap;
}

// json object store in firebase like
// {
//   hats:{
//     title:'Hats',
//     items:[{},{}]
//   },
//   sneakers:{
//     title:'Sneakers',
//     items:[{},{}]
//   }
// }

// create user collection and store in db
export const createUserDocumentFromAuth = async(userAuth,additionalUserInfo={}) => {
  if(!userAuth) return;

  const userDocRef = doc(db,'users',userAuth.uid) /// it point to user in db
  
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
  return userSnapshot
  //userSnapshot: users:collection name,uid will get after login by google provider signIN
  //here finally we create user Collection in firebase
}
//signup
export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    try{
    const res= await createUserWithEmailAndPassword(auth,email,password)
    return res;

    }catch(error) {
      throw error;
    }
}
//login
export const LoginUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  try{
  return  await signInWithEmailAndPassword(auth,email,password)

  }catch(error) {
    throw error;
  }
}

export const LogOutUser = async () => {
  return await signOut(auth)
}

//From the onAuthStateChanged Callback: it work such as Observer pattern

//Firebase automatically passes the currentUser object to the callback when the auth state changes.


export const onAuthStateChangedListener = (callback) =>  onAuthStateChanged(auth,callback)

export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const unsubscribe = onAuthStateChanged(auth,(userAuth) => {
      unsubscribe()
      resolve(userAuth)
    },
    reject//3rd parameter of onAuthStateChanged
  )
  
  })
}
