import { createContext,useState,useEffect } from "react";
import SHOP_DATA from "../shop-data";

import {addCollectionAndDocuments,getCategoriesAndDocuments} from "../utils/firebase/firebase.config"

export const ProductCategoriesContext = createContext({
  categoriesMap:{}
});

// categoriesMap : {
//   hats:[],
//   jacket:[]
// }

export const ProductsCategoriesProvider = ({children}) => {
  const [categoriesMap,setCategoriesMap]=useState({});
  const value={categoriesMap}
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
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  },[])

  return <ProductCategoriesContext.Provider value={value}>{children}</ProductCategoriesContext.Provider>
}
