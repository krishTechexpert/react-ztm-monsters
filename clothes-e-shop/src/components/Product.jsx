import React from 'react'
import CategoriesItem from '../components/categories-item/CategoriesItem'

export default function Product({categories}) {
  return (
    <div className='categories-container'>
      {categories.map((category) => (
        <CategoriesItem  key={category.id} category={category} />
      ))}
    </div>
  )
}
