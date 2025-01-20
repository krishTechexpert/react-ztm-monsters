import { createSlice } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { signInFailed,signUpFailed,signOutFailed,signOutSuccess,signInSuccess } from "./user.action";
import { UserData } from "../../utils/firebase/firebase.config";

export type UserState = {
  readonly currentUser:UserData | null;
  readonly isLoading:boolean;
  readonly error:Error | null;
}

const INITIAL_STATE:UserState={
  currentUser:null,
  isLoading:false,
  error:null
}

export const userReducer = (state=INITIAL_STATE,action:AnyAction) => {
  if(signInSuccess.match(action)){
    return {...state,currentUser:action.payload,isLoading:false}
  }
  if(signOutSuccess.match(action)){
    return {...state,currentUser:null,isLoading:false}
  }
  if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)){
    return {...state,isLoading:false,error:action.payload}
  }
  return state;
}




// redux toolkit code
// export const userSlice = createSlice({
//   name:'user',
//   initialState:INITIAL_STATE,
//   reducers:{
//     setCurrentUser(state,action){
//       state.currentUser = action.payload
//     },
//     signOutStart(state,action){
//       state.currentUser=null;
//     }
//   }
  
//  })

// // console.log("userSlice=",userSlice)
// export const {setCurrentUser,signOutStart} = userSlice.actions;

// export const userReducer = userSlice.reducer // you will get actual reducer function(userReducer) that get generated from create slice


// below code is used inside redux saga
// export const userReducerOld = (state=INITIAL_STATE,action) => {
//   // if state is same it means object reference(obj1 === obj2 both points to same location) is same this reducer will not update any state and UI/component will not re-render
//   const {type,payload}=action;
//   switch(type){
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return {...state,currentUser:payload,isLoading:false}
      
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return {...state,currentUser:null,isLoading:false}

//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//       return {...state,isLoading:false,error:payload} // this will run
//     default:
//       return state
//   }
// }