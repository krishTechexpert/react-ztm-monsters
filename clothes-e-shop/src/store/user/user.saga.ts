import {call,takeLatest,put,all} from 'typed-redux-saga/macro'

//macro--babel plugin for if you r using any 3rd party library in redux saga then you can used macro plugin as well

import { USER_ACTION_TYPES } from './user.types'

import {signInSuccess,signInFailed, signUpFailed,signUpSuccess, signOutSuccess, signOutFailed,EmailSignInStart,SignUpStart,SignUpSuccess} from "./user.action"

import { getCurrentUser,createUserDocumentFromAuth,signInWithGooglePopup,createAuthUserWithEmailAndPassword,LoginUserWithEmailAndPassword,LogOutUser,AdditionalInformation} from '../../utils/firebase/firebase.config'
import { User } from 'firebase/auth'


export function* getSnapshotFromUserAuth(userAuth:User,additionalDetails?:AdditionalInformation){
  try{
    const userSnapshot = yield* call(createUserDocumentFromAuth,userAuth,additionalDetails)
    //console.log(userSnapshot) // it contains user Id
    //console.log(userSnapshot.data()) // it contain displayName,email
    if(userSnapshot) {
      yield* put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
    }
  }catch(error) {
    yield* put(signInFailed(error as Error))
  }
}



// check user exist or not
export function* onCheckUserSession(){
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* isUserAuthenticated(){
  try{
    const userAuth = yield* call(getCurrentUser)
    if(!userAuth) return
    // call(fnName,parameter)
   yield* call(getSnapshotFromUserAuth,userAuth)
  }catch(error) {
    yield* put(signInFailed(error as Error))
  }
}
/***** END */


// create account with directly google signIn
export function* onGoogleSignInstart(){
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SING_IN_START,signInWithGoogle)
}
export function* signInWithGoogle(){
  try{
    const {user} =   yield* call(signInWithGooglePopup)
    yield* call(getSnapshotFromUserAuth,user)
  }catch(error) {
    yield* put(signInFailed(error as Error))
  }
}
/****** End */


// login via username and password
export function* onEmailSignInStart(){
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signInWithEmail)
}
export function* signInWithEmail({payload:{email,password}}:EmailSignInStart){ // destructure
  try{
  const userCredential =  yield* call(LoginUserWithEmailAndPassword,email,password);
  if(userCredential){
    const {user} = userCredential;
    yield* call(getSnapshotFromUserAuth,user)
  }
  }catch(error) {
    yield* put(signInFailed(error as Error))
  }
}
/**** End***** */

/***** SignUp for new user start */ 
export function* onSignUpStart(){
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START,processToStartSignUp)
}

export function* processToStartSignUp({payload:{email,password,displayName}}:SignUpStart){
  try{
    const userCredential =  yield* call(createAuthUserWithEmailAndPassword,email,password)
    if(userCredential) {
      const {user} = userCredential;
      yield* put(signUpSuccess(user,{displayName}))
    }
    }catch(error) {
      yield* put(signUpFailed(error as Error))
    }
}

export function* onSignUpSuccess(){
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS,loginAfterSignUp)
}

export function* loginAfterSignUp({payload:{user,additionalDetails}}:SignUpSuccess){
  yield* call(getSnapshotFromUserAuth,user,additionalDetails)
}
/****** SignUp End */


/*** SignOut  */
export function* onSignOutStart(){
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOut)
}

export function* signOut(){
  try{
    yield* call(LogOutUser) // call firebase fn
    yield* put(signOutSuccess()) // call user action
  }catch(error){
    yield* put(signOutFailed(error as Error)) // call user action
  }
}


// entry point of this file
export function* userSagas(){
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInstart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ])

}


//chat gpt example
// function* loginSaga(action) {
//   let attempts = 0;
//   while (attempts < 3) {
//     try {
//       const user = yield call(firebaseAuth.signInWithEmailAndPassword, action.payload.email, action.payload.password);
//       yield put({ type: 'LOGIN_SUCCESS', user });
//       return; // Exit on success
//     } catch (error) {
//       attempts += 1;
//       if (attempts === 3) {
//         yield put({ type: 'LOGIN_FAILURE', error });
//       } else {
//         yield delay(1000); // Wait before retrying
//       }
//     }
//   }
// }
