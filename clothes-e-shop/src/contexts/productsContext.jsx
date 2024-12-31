import { createContext,useState,useEffect } from "react";
import SHOP_DATA from "../shop-data";

import {addCollectionAndDocuments,getCategoriesAndDocuments} from "../utils/firebase/firebase.config"

export const ProductContext = createContext({
  products:[]
});

export const ProductsProvider = ({children}) => {
  const [products,setProducts]=useState([]);
  const value={products}
  console.log(value)

  //when app start if we used addCollectionAndDocuments('categories',SHOP_DATA), then it will create collection (categories) in firebase according to SHOP_DATA
  // useEffect(() => {
  //   we can add SHOP_DATA inside firebase collection bycode once and comment this useEffect code
  //   addCollectionAndDocuments('categories',SHOP_DATA)
  // },[])

//then fetch data categories from firebase
  useEffect(() => {
    const getCategoriesMap = async() => {
    const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
    }
    getCategoriesMap()
  },[])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
