import {USER_ACTION_TYPES} from "./user.types";

const INITIAL_STATE={
  currentUser:null
}

export const userReducer = (state=INITIAL_STATE,action) => {
  // if state is same it means object reference(obj1 === obj2 both points to same location) is same this reducer will not update any state and UI/component will not re-render
  const {type,payload}=action;
  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state,currentUser:payload}
    default:
      return state
  }
}