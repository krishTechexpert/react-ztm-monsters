import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product-card/ProductCard';
import "./shop-category-styles.scss";
import {selectCategoriesMap,selecCategoriesIsLoading} from "../../store/categories/category.selector";
import Spinner from '../../components/spinner/Spinner';

type CategoryRouteParam = {
  category:string
}

export default function ShopCategory() {

  const {category} = useParams<keyof CategoryRouteParam>() as CategoryRouteParam;

  const categories = useSelector(selectCategoriesMap) 
  const isLoading=  useSelector(selecCategoriesIsLoading)

  const [products,setProducts]=useState(categories[category]) 

  useEffect(() => {
    setProducts(categories[category])
  },[categories,category])
  return (
    <div className='shop-category-container'>
      <h2>{category.toUpperCase()}</h2>
      {isLoading ? <Spinner /> : 
      <div className='list'>
    {products && products.map((product) => (
      <ProductCard key={product.id} product={product} />

    ))}
    
    </div>
    }
    </div>
  )
}
