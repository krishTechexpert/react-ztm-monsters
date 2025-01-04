import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard';
import "./shop-category-styles.scss";
import {selectCategoriesMap} from "../../store/categories/category.selector";
import { useSelector } from 'react-redux';


export default function ShopCategory() {

  const {category} = useParams();
  console.log('render/re-render Shopcategory component')

  const categories = useSelector(selectCategoriesMap) // asyncronus 
  const [products,setProducts]=useState(categories[category]) //categories {} first time

  console.log("products=",products,categories) // product undefined first time
  //const products =  categoriesMap[category];it will render everytime when component re-render
  useEffect(() => {
    console.log('useEffect fired calling setproducts for shopCategory when runs on  component mount')
    setProducts(categories[category])
  },[categories,category])
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

/*
A] Initial Render

1.) Component Render Begins:

ShopCategory is rendered for the first time.
useParams is called to extract the category parameter from the URL.
A console.log statement logs:

render/re-render Shopcategory component


2. Selector Execution (selectCategoriesMap):

useSelector(selectCategoriesMap) is invoked.
The selectCategoriesMap selector executes and logs:
selector fired; selectCategoriesMap


3.useState Initialization:

The useState hook initializes products with categories[category].
At this point:
categories is an empty object ({}) because Redux state hasn't been fully loaded or updated yet.
categories[category] is undefined, so products is set to undefined.
A console.log logs:
products= undefined {}

4.useEffect Hook:

The useEffect hook is executed after the component is mounted.
Inside the effect:
A console.log logs:
useEffect fired calling setproducts for shopCategory

The setProducts(categories[category]) call is made. Since categories is still {}, categories[category] remains undefined, so no change occurs.


B] State Update from Redux

1. Redux State Updates:

The Redux state is updated (e.g., after fetching data from an API), triggering selectCategoriesMap to re-execute.
The selector logs:
selector fired; selectCategoriesMap

This time, selectCategoriesMap returns the correct transformed categories map based on the updated state.

2. useEffect Triggered:

Since categories has changed, the useEffect dependency array [categories] detects the change and re-executes.
A console.log logs:
useEffect fired calling setproducts for shopCategory

setProducts(categories[category]) is called again, but this time categories[category] contains the correct product list for the current category.
The state update (setProducts) triggers a re-render of the component.


c] Re-Render After State Update


1.) Component Re-Renders:

With the updated products state, the component re-renders.
A console.log logs:
render/re-render Shopcategory component

2.) Product List Displayed:

The products.map() loop runs and renders a ProductCard for each product in the list.



D] Key Points to Note
Why is categories Initially Empty?

Redux state is asynchronous. Initially, the state might not contain data (e.g., it's still fetching), so categories is {}.
Why Does useEffect Depend on categories?

Whenever categories is updated (e.g., via Redux), the useEffect ensures that products is re-synced to the current category.
What Causes Re-Renders?

Changes in state (products) or props (category) will trigger a re-render.
*/