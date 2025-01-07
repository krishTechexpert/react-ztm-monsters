import React,{useEffect} from 'react'
import {Routes,Route} from "react-router-dom";
import "./shop-styles.scss";
import CategoriesPreview from '../categories-preview/CategoriesPreview';
import ShopCategory from '../shop-category/ShopCategory';

import { useDispatch } from "react-redux";

import {fetchCategoriesAsync} from "../../store/categories/category.action"

export default function Shop() {
  const dispatch=useDispatch(); 

useEffect(() => {
  dispatch(fetchCategoriesAsync())
},[])
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<ShopCategory/>} />
    </Routes>
    
  )
}
