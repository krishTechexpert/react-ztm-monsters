import {CATEGORY_ACTION_TYPES} from "./category.types";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.config-backup"

export const fetchCategoriesStart = () => {
  return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,}
}

export const fetchCategoriesSuccess = (categoriesArray) => {
  return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:categoriesArray}
}

export const fetchCategoriesError = (error) => {
  return {type:CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,payload:error}
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