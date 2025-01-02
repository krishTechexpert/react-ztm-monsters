import React,{useContext,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {ProductCategoriesContext} from "../../contexts/productsContext"
import ProductCard from '../../components/product-card/ProductCard';
import "./shop-category-styles.scss";

export default function ShopCategory() {
  const {category} = useParams();
  const {categoriesMap}  = useContext(ProductCategoriesContext)
  const [products,setProducts]=useState(categoriesMap[category])
  //const products =  categoriesMap[category];it will render everytime when component re-render
  useEffect(() => {
    setProducts(categoriesMap[category])
  },[category,categoriesMap])
  return (
    <div className='shop-category-container'>
      <h2>{category.toUpperCase()}</h2>
      <div className='list'>
    {products && products.map((product) => (
      <ProductCard key={product.id} product={product} />

    ))}
    </div>
    </div>
  )
}
