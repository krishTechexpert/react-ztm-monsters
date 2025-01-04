import React,{useEffect} from 'react'
import {Routes,Route} from "react-router-dom";
import "./shop-styles.scss";
import CategoriesPreview from '../categories-preview/CategoriesPreview';
import ShopCategory from '../shop-category/ShopCategory';

import { useDispatch } from "react-redux";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.config"
import {setCategories} from "../../store/categories/category.action";


export default function Shop() {
  const dispatch=useDispatch(); 

//then fetch data categories from firebase
useEffect(() => {
  const getCategoriesMap = async() => {
  const categoryArray = await getCategoriesAndDocuments()
    dispatch(setCategories(categoryArray))
  }
  getCategoriesMap()
},[])
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<ShopCategory/>} />
    </Routes>
    
  )
}
