import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles';
import {gql,useQuery,useMutation} from "@apollo/client";
import Spinner from '../../components/spinner/spinner.component';

//  query($title:String!) ! means here title is manadatory 
const GET_CATEGORY = gql`
  query($title:String!){
    getCollectionsByTitle(title:$title){
      id  
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`

// mutation example

const SET_CATEGORY = gql`

mutation($category: Category!){
  addCategory(category:$category){
      id  
      title
      items {
        id
        name
        price
        imageUrl
      }
  }
}

`

const Category = () => {
  const { category } = useParams();

  const {loading,error,data} = useQuery(GET_CATEGORY,{
    variables:{
      title: category
    }
  })

  //[name of function,result{loading,data}]
  const [addCategory,{loading:setLoading,error:updateError,data:Updatedata}] = useMutation(SET_CATEGORY)

  //addCategory({variables:{category: categoryObject}}) //categoryObject this contains your new data in form of object 

  console.log(data)



  useEffect(() => {
    if(data){
      const {getCollectionsByTitle:{items}} = data;
      setProducts(items)
    }
  },[category,data])

  //const { categoriesMap,loading } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

//  Programmatically: You can access the cache programmatically in your code:
// This will log the entire contents of the InMemoryCache.


//Does It Persist Data Between Sessions?
//No, InMemoryCache does not persist data between browser sessions. If you want to persist the cache across page reloads or browser restarts, you can use a library like apollo3-cache-persist.


  //console.log(client.cache.extract());


  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);

  return (
    <Fragment>
      {
        loading ? <Spinner/> : <Fragment>
              <Title>{category.toUpperCase()}</Title>
              <CategoryContainer>
                {products &&
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </CategoryContainer>
        </Fragment>
      }
      
    </Fragment>
  );
};

export default Category;
