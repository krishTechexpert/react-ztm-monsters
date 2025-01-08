
import {CATEGORY_ACTION_TYPES} from "./category.types";
import {call,put,takeLatest,all} from "redux-saga/effects"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.config"
import { fetchCategoriesSuccess,fetchCategoriesError } from "./category.action"




export function* fetchCategoriesAsync(){
  try{
    //then fetch data categories from firebase id
    const categoriesArray = yield call(getCategoriesAndDocuments,'categories'); // wait for response and if get  success response then execute next success action
    yield put(fetchCategoriesSuccess(categoriesArray))
  }catch(error){
  //  if error then next error action execute
    yield put(fetchCategoriesError(error))
  }  
}

export function* onFetchCategories(){
  yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
}

export function* categoriesSaga(){
//  Creates an Effect description that instructs the middleware to run multiple Effects in parallel and wait for all of them to complete. It's quite the corresponding API to standard Promise#all.
  yield all([call(onFetchCategories)])
}
