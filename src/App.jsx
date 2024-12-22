import { useState,useEffect } from 'react'

import './App.css'
import React from 'react';
import CardList from './components/card-list/CardList';
import SearchBox from "./components/search-box/SearchBox";
const functionReferences = new Set();

const App = ()=> {
  const [searchField,setSearchField]=useState('');
  const[monsters,setMonsters]=useState([]);
  const [filteredMonsters,setFilteredMonsters]=useState(monsters)

  const onChangeSearch =(event) =>{
    const value = event.target.value.toLowerCase();
    setSearchField(value)
  }

    
  useEffect(() => {
    console.log('use effect once')
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
   .then((users) => setMonsters(users))
  },[])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField) 
    })
    setFilteredMonsters(newFilteredMonsters)
    console.log('effect is firing...')
  },[monsters,searchField])

  
  return (
    <div className='app'>
    <h1 className='app-title'>Monsters Rolodex</h1>
     <SearchBox className='monster-search'  placeholder='search monsters' onChangeHandler={onChangeSearch}/>
    <CardList monsters={filteredMonsters} />
  </div>
  
  )
}


export default App


