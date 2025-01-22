import React from 'react'
import {useNavigate} from "react-router-dom";
import {BackgroundImage,Body,CategoryContainer} from  './categories-styles.jsx'
import { CategoriesDesc } from '../../routes/home/Home.js';

type CategroiesItemProps = {
  category:CategoriesDesc
}

export default function CategoriesItem({category}:CategroiesItemProps) {
  const navigate = useNavigate();
  const {title,imageUrl}=category;
    function handleCategory(){
      navigate(`shop/${title}`)
    }
  return (
    <CategoryContainer onClick={handleCategory}>
        <BackgroundImage imageUrl = {imageUrl} />
        <Body>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
    </CategoryContainer>
  )
}
