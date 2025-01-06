import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/ProductCard';
import "./shop-category-styles.scss";
import {selectCategoriesMap} from "../../store/categories/category.selector";
import { useSelector } from 'react-redux';


export default function ShopCategory() {

  const {category} = useParams();
  console.log('render/re-render Shopcategory component')

  const categories = useSelector(selectCategoriesMap) // if we don't used reselect library then this will return new object everytime which will re-render this component as well that's why we used reSelect libraray for useSelector memomization 
  /*
  useSelector Execution:

  useSelector(selectCategoriesMap) is called.
  The selectCategoriesMap function runs immediately and synchronously.
  Since the initial Redux state might still be empty, the selector logs:
  selector fired; selectCategoriesMap
  and returns an empty object {}.*/
  

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


  useSelector(selectCategoriesMap) is called.
  The selectCategoriesMap function runs immediately and synchronously.
  Since the initial Redux state might still be empty, the selector logs:
  selector fired; selectCategoriesMap
  and returns an empty object {}.because before action dispatch categoryReducer return default state categories:{} empty object firsTime

  


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

The setProducts(categories[category]) call is made. Since categories is still {}, categories[category] remains undefined, undefined === undefined is true so no change occurs.


B] State Update from Redux


1.)send Action Dispatch:

Redux state is updated (e.g., data is fetched and stored in state.categories.categories) and store is also updated.
This triggers a re-run of selectCategoriesMap.it will first update and sync state with store
selector fired; selectCategoriesMap

2.) Selector Re-Runs:

selectCategoriesMap is called again due to the state change.b'coz it will first update and sync state with store 
It now computes the updated categories map and logs: 
selector fired; selectCategoriesMap

3.) useEffect Re-Triggers:

The categories object has changed, so the useEffect hook re-runs.
setProducts(categories[category]) is called with the updated categories.
This updates the products state and triggers a re-render of the component.


c] Re-Render After State Update

it will make sure yadi useSelector used hwa hai inside anywhere in  app then it will first update our state then usky baad comonent re-render krega (very imp line here)

1.) Component Re-Renders:

With the updated products state, the component re-renders.
A console.log logs:
render/re-render Shopcategory component

2.) Product List Displayed:

The products.map() loop runs and renders a ProductCard for each product in the list.


/*Final Notes
useSelector is synchronous; it immediately retrieves data from the store. and update/syn state in app first usky baad component re-render
Re-renders are caused by changes in state or props.*/
