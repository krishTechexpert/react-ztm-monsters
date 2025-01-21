import {USER_ACTION_TYPES} from "./user.types";
import { createAction,withMatcher,Action,ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { UserData,AdditionalInformation } from "../../utils/firebase/firebase.config";
import { User } from "firebase/auth";

//types
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER,UserData>
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SING_IN_START>
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START,{email:string,password:string}>

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS,UserData>
export type SignInFailed =  ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED,Error>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START,{email:string,password:string,displayName:string}>
export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user:User,additionalDetails:AdditionalInformation}>
export type SignUpFailed=ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED,Error>

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS> 
export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED,Error>

//action
// these action we will called by dispatch method with payload or not
export const checkUserSession = withMatcher(():CheckUserSession => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
  //return {type:USER_ACTION_TYPES.CHECK_USER_SESSION}
})

export const setCurrentUser = withMatcher((user:UserData):SetCurrentUser =>{
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user)
  //return {type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user}
})

export const googleSignInStart = withMatcher(():GoogleSignInStart => {
  return  createAction(USER_ACTION_TYPES.GOOGLE_SING_IN_START)
  //return {type:USER_ACTION_TYPES.GOOGLE_SING_IN_START}
})

//enter username and password
export const emailSignInStart = withMatcher((email:string,password:string):EmailSignInStart => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,{email,password})
  //return {type:USER_ACTION_TYPES.EMAIL_SIGN_IN_START,payload:{email,password}}
})

export const signInSuccess = withMatcher((user:UserData & {id:string}):SignInSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS,user)
  //return {type:USER_ACTION_TYPES.SIGN_IN_SUCCESS,payload:user}
})

export const signInFailed = withMatcher((error:Error):SignInFailed => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED,error)
  //return {type:USER_ACTION_TYPES.SIGN_IN_FAILED,payload:error}
})

export const signUpStart = withMatcher((email:string,password:string,displayName:string):SignUpStart => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_START,{email,password,displayName})
  //return {type:USER_ACTION_TYPES.SIGN_UP_START,payload:{email,password,displayName}}
})

export const signUpSuccess = withMatcher((user:User,additionalDetails:AdditionalInformation):SignUpSuccess => {
return  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user,additionalDetails})
  //return {type:USER_ACTION_TYPES.SIGN_UP_SUCCESS,payload:{user,additionalDetails}}
})

export const signUpFailed = withMatcher((error:Error):SignUpFailed => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILED,error)
  //return {type:USER_ACTION_TYPES.SIGN_UP_FAILED,payload:error}
})

export const signOutStart = withMatcher(():SignOutStart => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START)
  //return {type:USER_ACTION_TYPES.SIGN_OUT_START}
})
export const signOutSuccess = withMatcher(():SignOutSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
  //return {type:USER_ACTION_TYPES.SIGN_OUT_SUCCESS}
})
export const signOutFailed = withMatcher((error:Error):SignOutFailed => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED,error)
  //return {type:USER_ACTION_TYPES.SIGN_OUT_FAILED,payload:error}
})