import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from "../../components/spinner/spinner.component"
const CategoriesPreview = () => {
  const { categoriesMap,loading } = useContext(CategoriesContext);
  //categoriesMap => {title:items[]} contains
  // {
  //   hats: [
  //       {
  //           "__typename": "Item",
  //           "id": "cjwuuj5ip000j0719taw0mjdz",
  //           "price": 25,
  //           "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png",
  //           "name": "Brown Brim"
  //       },
        
  //   ],
  //   jackets: [
  //       {
  //           "__typename": "Item",
  //           "id": "cjwuun2fp001a0719thf91fzq",
  //           "price": 125,
  //           "imageUrl": "https://i.ibb.co/XzcwL5s/black-shearling.png",
  //           "name": "Black Jean Shearling"
  //       }
  //   ]
  // }
    

  return (
    <Fragment>
      {loading ? <Spinner/> : (Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      }))}
    </Fragment>
  );
};

export default CategoriesPreview;
