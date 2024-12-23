import React from 'react'
import './categories-styles.scss'

export default function CategoriesItem({category}) {
  const {title,imageUrl}=category;
  return (
    <div className='category-container'>
        <div className='background-image' style={{backgroundImage:`url(${imageUrl})`}}></div>
        <div className='category-body-container'>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
    </div>
  )
}
