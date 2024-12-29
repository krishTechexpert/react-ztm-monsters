import React,{useContext} from 'react'
import {ProductContext} from "../../contexts/productsContext";
import ProductCard from '../../components/product-card/ProductCard';
import "./shop-styles.scss";

export default function Shop() {
  const {products}  = useContext(ProductContext)
  return (
    <div className='shop-grid'>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product}  />
      })}
    </div>
  )
}
