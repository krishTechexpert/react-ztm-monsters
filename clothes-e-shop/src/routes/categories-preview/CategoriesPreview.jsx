import React from 'react'
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/CategoryPreview';
import {selectCategoriesMap} from "../../store/categories/category.selector";

export default function CategoriesPreview() {
  const categories = useSelector(selectCategoriesMap)
  console.log(categories)
  return (
    <>
      {Object.keys(categories).map((title) => {
        const products =  categories[title];
        return <CategoryPreview key={title} title={title} products={products}/>
      })}
    
    </>
  )
}
