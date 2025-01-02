import React from 'react'
import CategoriesItem from '../components/categories-item/CategoriesItem'
import {CategoriesContainer} from "../components/categories-item/categories-styles"
export default function Product({categories}) {
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <CategoriesItem  key={category.id} category={category} />
      ))}
    </CategoriesContainer>
  )
}
