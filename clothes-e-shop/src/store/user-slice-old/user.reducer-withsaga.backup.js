import {USER_ACTION_TYPES} from "./user.types";

const INITIAL_STATE={
  currentUser:null,
  isLoading:false,
  error:null
}

export const userReducer = (state=INITIAL_STATE,action) => {
  // if state is same it means object reference(obj1 === obj2 both points to same location) is same this reducer will not update any state and UI/component will not re-render
  const {type,payload}=action;
  switch(type){
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {...state,currentUser:payload,isLoading:false}
      
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {...state,currentUser:null,isLoading:false}

    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {...state,isLoading:false,error:payload} // this will run
    default:
      return state
  }
}