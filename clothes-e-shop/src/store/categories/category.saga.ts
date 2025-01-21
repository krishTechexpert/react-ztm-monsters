
import {CATEGORY_ACTION_TYPES} from "./category.types";
//import {all} from "redux-saga/effects";
import {takeLatest,put,call,all} from 'typed-redux-saga/macro'

//import {call,takeLatest,put,all} from 'typed-redux-saga/macro'; give some error here

//for typescript step then convert yield to yield* and add this in downlevelIteration inside tsconfig.json file
//import { call } from 'redux-saga/effects';

/**
 * 
  The macro is primarily for typing generator functions (call, put, etc.).
 */
//import {call,takeLatest,put,all} from 'typed-redux-saga/macro'

//macro--babel plugin for if you r using any 3rd party library in redux saga then you can used macro plugin as well


import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.config"
import { fetchCategoriesSuccess,fetchCategoriesError } from "./category.action"

/*Key Difference Between yield and yield*
yield:
Pauses and waits for a single effect or generator to resolve.
It does not delegate control to another generator.
yield*:
Delegates control to another generator or iterable.
The current generator "inherits" all the yielded values from the delegated generator.*/


/*Why You Might Need to Convert yield to yield* in TypeScript
For Type-Safety in Generators:

In TypeScript, when you use yield*, the TypeScript compiler knows that the delegated generator returns a value. It can correctly infer types.
With yield, the return value isn't directly connected to the generator, so you may lose type safety.
When Delegating to Another Generator:
Reusing Logic in Generators:

If one generator (e.g., fetchUser) contains reusable logic and another generator (e.g., mainSaga) depends on it, yield* ensures type-safe delegation*/





export function* fetchCategoriesAsync(){
  try{
    //then fetch data categories from firebase id
    const categoriesArray = yield* call(getCategoriesAndDocuments); // wait for response and if get  success response then execute next success action
    yield* put(fetchCategoriesSuccess(categoriesArray))
  }catch(error){
  //  if error then next error action execute
    yield* put(fetchCategoriesError(error as Error))
  }  
}

export function* onFetchCategories(){
  yield* takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
}

export function* categoriesSaga(){
//  Creates an Effect description that instructs the middleware to run multiple Effects in parallel and wait for all of them to complete. It's quite the corresponding API to standard Promise#all.
  yield* all([call(onFetchCategories)])
}


