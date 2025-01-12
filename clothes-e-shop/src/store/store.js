//import {createStore,compose,applyMiddleware} from 'redux'
import {configureStore} from "@reduxjs/toolkit"
import logger from 'redux-logger'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducers'
import{myloggerMiddleWare} from "./middleware/logger"


const persistConfig={
  key:'root',
  storage, // default stotage is localstorage,
  //blacklist:['user'] // user will not put in localstorage
  whitelist:['cart']
}


const persistedReducer = persistReducer(persistConfig,rootReducer)



//whenever you dispatch an action before that action hits the reducer, it hits the middleware(logger,redux-thunk) first.
// logger is like middleware which is used to check state before and after action is dispatch

// redux prebuild logger
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);//[fn]

//custom middleware
//const middleWares = [myloggerMiddleWare];


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

//firstArgument: reducer,
//secondArgument(optional): if you want to add any additional default states
//thirdArguments(optional): middleware
//export const store = createStore(persistedReducer,undefined,composedEnhancers)

export const store = configureStore({
  reducer:rootReducer,
  //middleware:middleWares // default redux-thunk middleware available in redux-toolkit

  // to fixed below error
  //if we passed payload which comes from firebase which is not string,object, but it is kind of non-serializable values such as Promises, Symbols, Maps/Sets, functions, or class instances then we show error
  //A non-serializable value was detected in an action, in the path: `payload`. Value:
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(middleWares)
  
  //which return default middlware and then we can concat with our custom middleware as well
})



//export const persistor =persistStore(store)



/*
Flow of Redux Updates with useSelector if you are using  in case of redux-thunk 

1.) Action Dispatch:

When you call dispatch(action), the action is sent to the Redux store.
Example:
dispatch({ type: 'INCREMENT', payload: 1 });


2.) Reducer Updates State:

The dispatched action is passed to the reducer.
The reducer processes the action and returns the new state.
Example:
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};


3.) Redux Store Updates:

The store replaces the old state with the new state returned by the reducer.

//very important point no. 4
4.) useSelector Reads Updated State:

All useSelector hooks in your app are automatically triggered when the Redux store's state updates.
The selector functions will compare the previous state and the new state.
If the selected part of the state has changed, the component using that useSelector will re-render.

Action → Reducer → Store Update → useSelector → UI Re-render.


5.) UI Component Re-Renders:

If the value returned by useSelector has changed, React will trigger a re-render for that specific component.



Key Points
useSelector runs after the Redux store is updated by the reducer.
React components re-render only if the value returned by useSelector has changed.
The flow ensures that the UI is always in sync with the latest state from the Redux store.


Yes, this is the correct flow! It ensures a clean and predictable state management flow:

Action → Reducer → Store Update → useSelector → UI Re-render.
This guarantees that the UI is always driven by the latest state from the Redux store, avoiding inconsistencies.
*/





