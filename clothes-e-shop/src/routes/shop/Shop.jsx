import React,{useEffect} from 'react'
import {Routes,Route} from "react-router-dom";
import "./shop-styles.scss";
import CategoriesPreview from '../categories-preview/CategoriesPreview';
import ShopCategory from '../shop-category/ShopCategory';

import { useDispatch } from "react-redux";

import {fetchCategoriesSuccess,fetchCategoriesStart} from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.config';

export default function Shop() {
  const dispatch=useDispatch(); 

useEffect(() => {
  dispatch(fetchCategoriesStart()) //call for saga action

  //without saga
// const getCategoriesMap = async () => {
//   const categoriesarray =   await getCategoriesAndDocuments()
//   dispatch(fetchCategoriesSuccess(categoriesarray))
// }
//getCategoriesMap()

},[])
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<ShopCategory/>} />
    </Routes>
    
  )
}
