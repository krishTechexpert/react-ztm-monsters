import {CATEGORY_ACTION_TYPES,Category} from "./category.types";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.config"
import { createAction,Action,ActionWithPayload } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START> // it will return {type:'category/FETCH_CATEGORIES_START'}

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,Category[]> //it will return {type:'category/FETCH_CATEGORIES_SUCCESS',payload:[]}

export type FetchCategoriesError = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error> // {type:'category/FETCH_CATEGORIES_FAILED',payload:'error message'}

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesError;


export const fetchCategoriesStart = ():FetchCategoriesStart => {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
  //return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START}
}

export const fetchCategoriesSuccess = (categoriesArray:Category[]):FetchCategoriesSuccess => {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesArray)
  //return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:categoriesArray}
}

export const fetchCategoriesError = (error:Error):FetchCategoriesError => {
  return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error)
  //return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,payload:error}
}

//async action creator for redux-thunk

// export const fetchCategoriesAsync = () => {
//   return async(dispatch) => {
//     dispatch(fetchCategoriesStart())
//     try{
//       //then fetch data categories from firebase
//     const categoriesArray =   await getCategoriesAndDocuments();
//     dispatch(fetchCategoriesSuccess(categoriesArray))
//     }catch(error){
//       dispatch(fetchCategoriesError(error))
//     }
//   }
// }