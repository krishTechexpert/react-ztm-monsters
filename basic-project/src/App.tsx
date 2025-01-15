import { useState,useEffect,ChangeEvent } from 'react'

import './App.css'
import React from 'react';
import CardList from './components/card-list/CardList';
import SearchBox from "./components/search-box/SearchBox";
const functionReferences = new Set();
import { getData } from './utils/data.utils';

export type Monster =  {
  id:string,
  name:string,
  email:string
}
// A never type means "this value should never exist."
// A never[] means "an array that can never have any elements of any type."
//The never type means something that should never happen.
//let x: never;
//x = 5; // ❌ Error: Type '5' is not assignable to 'never'

const App = ()=> {
  const [searchField,setSearchField]=useState('');
  const[monsters,setMonsters]=useState<Monster[]>([]);
  const [filteredMonsters,setFilteredMonsters]=useState(monsters)

  const onChangeSearch =(event:ChangeEvent<HTMLInputElement>) =>{
    const value = event.target.value.toLowerCase();
    setSearchField(value)
  }

    
  useEffect(() => {
    const fetchUsers = async() => {
    const users =   await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
    setMonsters(users)
    }
    fetchUsers()
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then((res) => res.json())
    // .then((users) => setMonsters(users))
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


