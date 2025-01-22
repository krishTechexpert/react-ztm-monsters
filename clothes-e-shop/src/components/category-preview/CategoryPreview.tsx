import React from 'react'
import "./category-preview-styles.scss"
import ProductCard from '../product-card/ProductCard'
import { useParams , Link} from 'react-router-dom';
import { CategoryItem } from '../../store/categories/category.types';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

export default function CategoryPreview({title,products}:CategoryPreviewProps) {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link to={title} className='title'>{title.toUpperCase()}</Link>
      </h2>
      <div className='preview'>
        { products
          .filter((_,index) => index<4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}
