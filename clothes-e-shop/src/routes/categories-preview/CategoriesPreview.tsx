import React from 'react'
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/CategoryPreview';
import {selectCategoriesMap,selecCategoriesIsLoading} from "../../store/categories/category.selector";
import Spinner from '../../components/spinner/Spinner';
export default function CategoriesPreview() {
  const categories = useSelector(selectCategoriesMap)
  const isLoading=  useSelector(selecCategoriesIsLoading)
  return (
    <>
      {isLoading ? <Spinner/> :
      Object.keys(categories).map((title) => {
        const products =  categories[title];
        return <CategoryPreview key={title} title={title} products={products}/>
      })}
    </>
  )
}
