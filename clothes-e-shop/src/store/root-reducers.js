import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import {categoriesReducer} from "./categories/category.reducer";


export const rootReducer = combineReducers({
  //{key as name of reducer: reducerFn as value as reducer function}
  user:userReducer,
  categories:categoriesReducer
})

//Whenever reducer(userReducer or categoriesReducer) updates any of these reducer values, the entire store object is going to be a new store object.

