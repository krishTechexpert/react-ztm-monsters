  import { createSlice } from "@reduxjs/toolkit";
import {CATEGORY_ACTION_TYPES} from "./category.types";
export const CATEGORIES_INITIAL_STATE={
  categories:[],
  isLoading:true,
  //error:null
}

export const categorySlice = createSlice({
  name:'categories',
  initialState:CATEGORIES_INITIAL_STATE,
  reducers:{
    fetchCategoriesSuccess(state,action){
      state.categories=action.payload
      state.isLoading=false
    }
  }
})

export const {fetchCategoriesSuccess} = categorySlice.actions;

export const categoriesReducer = categorySlice.reducer

