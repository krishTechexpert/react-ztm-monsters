import React from 'react';
import "./card-list-style.css";

const CardList = (props) => {
    const {monsters} = props;

    return (<div className='card-list'>
      {monsters.map((monster) => {
        const {name,email,id} = monster;
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