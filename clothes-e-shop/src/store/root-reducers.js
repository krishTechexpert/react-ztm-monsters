import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import {categoriesReducer} from "./categories/category.reducer";


export const rootReducer = combineReducers({
  //{key as name of reducer: reducerFn as value as reducer function}
  user:userReducer,
  categories:categoriesReducer
})