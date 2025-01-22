import React from 'react'
import CategoriesItem from './categories-item/CategoriesItem'
import {CategoriesContainer} from "./categories-item/categories-styles"
import {CategoriesDesc} from "../routes/home/Home" 

type CategroiesItemProps = {
  categories:CategoriesDesc[]
}

export default function Product({categories}:CategroiesItemProps) {
  return (
    <CategoriesContainer>
      {categories && categories.map((category:CategoriesDesc) => (
        <CategoriesItem  key={category.id} category={category} />
      ))}
    </CategoriesContainer>
  )
}
