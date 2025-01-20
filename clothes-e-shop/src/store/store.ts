import {createStore,compose,applyMiddleware,Middleware} from 'redux'
//import {thunk} from 'redux-thunk'

import logger from 'redux-logger'; //npm i --save-dev @types/redux-logger (if for using typescript)

import {persistStore,persistReducer,PersistConfig} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducers'
import{myloggerMiddleWare} from "./middleware/logger"

/*The error message indicates that TypeScript cannot recognize the __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ property on the window object. This happens because TypeScript does not know about the custom property added by the Redux DevTools browser extension.

To fix this issue, you need to let TypeScript know that window can have this property. This is done by extending the Window interface.

compose is imported from redux, as it's the type for the __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ function.

TypeScript Declaration:
By extending the Window interface, TypeScript recognizes that __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ can exist on the window object.



*/


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

import createSagaMiddleware from "redux-saga"
import {rootSaga} from "./root-saga" 

//ReturnType is a utility type in TypeScript that extracts the return type of a function type. It's part of TypeScript's built-in utility types.


export type RootState = ReturnType<typeof rootReducer> // we can used here below
//RootSate like ReturnType will work automatically /{
//   user:UserState,
//   categories:CATEGORIES_INITIAL_STATE,
//   cart:CartState

// }
//export const selectUserReducer = (state:RootSate):UserState => state.user


//we want whitelist contaons only key accordig to our rootstate so we need PersistConfig 

//In TypeScript, the keyof keyword is used to create a union of all the keys of a given type. Let's break down the provided code and understand what keyof means in this context:
/*type RootState = {
  user: UserState;
  categories: CategoriesState;
  cart: CartState;
};

type Keys = keyof RootState; 
// Equivalent to: "user" | "categories" | "cart"

whitelist: (keyof RootState)[]
This means the whitelist property is an array containing strings that are keys of the RootState object.


*/



type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[] // we say here it contains either user,or caregories or cart as whitelist []
}

const persistConfig:ExtendedPersistConfig={
  key:'root',
  storage, // default stotage is localstorage,
  //blacklist:['user'] // user will not put in localstorage
  whitelist:['cart']
}

const sagaMiddleware= createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig,rootReducer)



//whenever you dispatch an action before that action hits the reducer, it hits the middleware(logger,redux-thunk) first.
// logger is like middleware which is used to check state before and after action is dispatch

// redux prebuild logger
const middleWares = [process.env.NODE_ENV !== 'production' && logger,sagaMiddleware].filter((middleware):middleware is Middleware => Boolean(middleware));//[fn]

//custom middleware
//const middleWares = [myloggerMiddleWare];


const composeEnhancers = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

//firstArgument: reducer,
//secondArgument(optional): if you want to add any additional default states
//thirdArguments(optional): middleware

export const store = createStore(persistedReducer,undefined,composedEnhancers)

sagaMiddleware.run(rootSaga) // entry poinst for saga who listen/watcher saga action

export const persistor =persistStore(store)



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

Action → Reducer → Store Update → useSelector update → UI Re-render.
This guarantees that the UI is always driven by the latest state from the Redux store, avoiding inconsistencies.
*/





