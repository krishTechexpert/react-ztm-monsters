import { combineReducers } from "redux";
import { userReducer } from "./user-slice-old/user.reducer";
import {categoriesReducer} from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  //{key as name of reducer: reducerFn as value as reducer function}
  user:userReducer,
  categories:categoriesReducer,
  cart:cartReducer

})

//Whenever reducer(userReducer or categoriesReducer) updates any of these reducer values, the entire store object is going to be a new store object.
