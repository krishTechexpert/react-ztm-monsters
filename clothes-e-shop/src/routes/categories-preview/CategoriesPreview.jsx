import React,{useContext} from 'react'
import CategoryPreview from '../../components/category-preview/CategoryPreview';
import {ProductCategoriesContext} from "../../contexts/productsContext"
export default function CategoriesPreview() {
  const {categoriesMap}  = useContext(ProductCategoriesContext)

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products =  categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products}/>
      })}
    
    </>
  )
}
