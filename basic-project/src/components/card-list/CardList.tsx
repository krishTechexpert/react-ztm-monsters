import React from 'react';
import "./card-list-style.css";
import { Monster } from '../../App';

type CardProps = {
  monsters:Monster[]
}

const CardList = ({monsters}:CardProps) => {

    return (<div className='card-list'>
      {monsters.map((monster:Monster) => {
        const {id,name,email} = monster;
        return (
          <div className='card-container' key={id}>
            <img alt={`monster-${name}`}
            src={`https://robohash.org/${id}?set=set2&size=180x180`} />
          <h2>{name}</h2>
          <p>{email}</p>
        </div>)
      })}
    </div>)
  }

export default CardList;