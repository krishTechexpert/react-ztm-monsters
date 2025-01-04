import {CATEGORY_ACTION_TYPES} from "./category.types";

export const setCategories = (categoriesArray) =>{
  return {type:CATEGORY_ACTION_TYPES.SET_CATEGORIES,payload:categoriesArray}
}