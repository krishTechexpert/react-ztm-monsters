import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,User,onAuthStateChanged, NextOrObserver} from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc,collection, writeBatch,query,getDocs, QueryDocumentSnapshot} from "firebase/firestore"
import { Category } from "../../store/categories/category.types";

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

export type ObjectToAdd = {
  title:string
}

// insert data into collection
export const addCollectionAndDocuments = async<T extends ObjectToAdd>(collectionKey:string,objectsToAdd:T[]):Promise<void> => {
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
export const getCategoriesAndDocuments = async():Promise<Category[]> => {
  const collectionRef =  collection(db,'categories')
  const q = query(collectionRef)
  const querySnapshot= await getDocs(q)
  // send original api data to categoriesReducer  without any transforming
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category) //[{title:'hats',items:[]}]

  //as Category means It tells TypeScript, "Treat the object returned by docSnapshot.data() as having the shape of the Category type."


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

export type AdditionalInformation = {
  displayName?:string;
}

export type UserData = {
  createdAt:Date;
  displayName:string;
  email:string
}

// create user collection and store in db
export const createUserDocumentFromAuth = async(userAuth:User,additionalUserInfo={} as AdditionalInformation):Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error creating the user',error)
    }
  }

  // if user data exist then return userDocRef
  return userSnapshot as QueryDocumentSnapshot<UserData>
  //userSnapshot: users:collection name,uid will get after login by google provider signIN
  //here finally we create user Collection in firebase
}
//signup
export const createAuthUserWithEmailAndPassword = async (email:string,password:string) => {
    if(!email || !password) return;
    try{
    const res= await createUserWithEmailAndPassword(auth,email,password)//automatically return type ,not need to return promise<void | UserCredential>
    return res;

    }catch(error) {
      throw error;
    }
}
//login
export const LoginUserWithEmailAndPassword = async (email:string,password:string) => {
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


export const onAuthStateChangedListener = (callback:NextOrObserver<User>) =>  onAuthStateChanged(auth,callback)

export const getCurrentUser = ():Promise<User | null> => {
  return new Promise((resolve,reject) => {
    const unsubscribe = onAuthStateChanged(auth,(userAuth) => {
      unsubscribe()
      resolve(userAuth)
    },
    reject//3rd parameter of onAuthStateChanged
  )
  
  })
}
