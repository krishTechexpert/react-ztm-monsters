import { Middleware,AnyAction } from "redux";
import { RootState } from "../store";
// similar our custom middleware work as redux-logger
export const myloggerMiddleWare:Middleware<{},RootState> = (store) => (next) => (action:AnyAction) => {
  if(!action.type){
    return
  }
  console.log('type: ',action.type);
  console.log('payload: ',action.payload)
  console.log('currentState: ',store.getState())
  
  next(action) // synchronous hai y, // Pass the action to the next middleware/reducer.

  console.log('next state ',store.getState())
}


// const curryFn = (a) => (b,c) => {
//   return a+b-c;
// }

// const with = curryFn(10)
// console.log(with(2,3))
