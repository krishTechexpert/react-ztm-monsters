// similar our custom middleware work as redux-logger
export const myloggerMiddleWare = (store) => (next) => (action) => {
  if(!action.type){
    return
  }
  console.log('type: ',action.type);
  console.log('payload: ',action.payload)
  console.log('currentState: ',store.getState())
  
  next(action) // synchronous hai y

  console.log('next state ',store.getState())
}


// const curryFn = (a) => (b,c) => {
//   return a+b-c;
// }

// const with = curryFn(10)
// console.log(with(2,3))
