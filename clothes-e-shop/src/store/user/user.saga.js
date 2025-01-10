import {call,takeLatest,put,all, takeLeading} from 'redux-saga/effects'

import { USER_ACTION_TYPES } from './user.types'

import {signInSuccess,signInFailed, signUpFailed,signUpSuccess, signOutSuccess, signOutFailed} from "./user.action"

import { getCurrentUser,createUserDocumentFromAuth,signInWithGooglePopup,createAuthUserWithEmailAndPassword,LoginUserWithEmailAndPassword,LogOutUser} from '../../utils/firebase/firebase.config'


export function* getSnapshotFromUserAuth(userAuth,additionalDetails){
  try{
    const userSnapshot = yield call(createUserDocumentFromAuth,userAuth,additionalDetails)
    //console.log(userSnapshot) // it contains user Id
    //console.log(userSnapshot.data()) // it contain displayName,email
    yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
  }catch(error) {
    yield put(signInFailed(error))
  }
}



// check user exist or not
export function* onCheckUserSession(){
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* isUserAuthenticated(){
  try{
    const userAuth = yield call(getCurrentUser)
    if(!userAuth) return
    // call(fnName,parameter)
   yield call(getSnapshotFromUserAuth,userAuth)
  }catch(error) {
    yield put(signInFailed(error))
  }
}
/***** END */


// create account with directly google signIn
export function* onGoogleSignInstart(){
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SING_IN_START,signInWithGoogle)
}
export function* signInWithGoogle(){
  try{
    const {user} =   yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUserAuth,user)
  }catch(error) {
    yield put(signInFailed(error))
  }
}
/****** End */


// login via username and password
export function* onEmailSignInStart(){
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signInWithEmail)
}
export function* signInWithEmail({payload:{email,password}}){ // destructure
  try{
  const {user} =  yield call(LoginUserWithEmailAndPassword,email,password)
  yield call(getSnapshotFromUserAuth,user)
  }catch(error) {
    yield put(signInFailed(error))
  }
}
/**** End***** */

/***** SignUp for new user start */ 
export function* onSignUpStart(){
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START,processToStartSignUp)
}

export function* processToStartSignUp({payload:{email,password,displayName}}){
  try{
    const {user} =  yield call(createAuthUserWithEmailAndPassword,email,password)
    yield put(signUpSuccess(user,{displayName}))
    }catch(error) {
      yield put(signUpFailed(error))
    }
}

export function* onSignUpSuccess(){
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS,loginAfterSignUp)
}

export function* loginAfterSignUp({payload:{user,additionalDetails}}){
  yield call(getSnapshotFromUserAuth,user,additionalDetails)
}
/****** SignUp End */


/*** SignOut  */
export function* onSignOutStart(){
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOut)
}

export function* signOut(){
  try{
    yield call(LogOutUser) // call firebase fn
    yield put(signOutSuccess()) // call user action
  }catch(error){
    yield put(signOutFailed(error)) // call user action
  }
}


// entry point of this file
export function* userSagas(){
  yield all([
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
