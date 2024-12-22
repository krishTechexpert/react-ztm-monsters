import { useState } from 'react'

import './App.css'
import React from 'react';
import CardList from './components/card-list/CardList';
import SearchBox from "./components/search-box/SearchBox";
const functionReferences = new Set();

class App extends React.Component {
  constructor(){
    console.log('constructor...')
    super();
    this.state={
      monsters: [],
      sarchQuery:'',
      count:0  
    }
    // verify onChangeSearch referecne has got same
    // Add the onChangeSearch reference to the Set
    functionReferences.add(this.onChangeSearch);
    console.log('Function references in constructor:', functionReferences);

  }
  componentDidMount(){
    console.log('component did mount...')
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => this.setState(() => {
      return {
        monsters:users,
      }
    }))
  }
  // this method store once in memory and we are only calling it onChange.that's why we don't put it inside render() method
  onChangeSearch =(event) =>{
    console.log('onChangeSearch')
      const val = event.target.value.toLowerCase();
      this.setState(() => {
        return {
          sarchQuery: val
        }
      })
  }
  

render(){
  console.log('render...')

  const {sarchQuery,monsters} =this.state;
  const {onChangeSearch} = this;
  
  // Add the onChangeSearch reference to the Set
  functionReferences.add(onChangeSearch);
  console.log('Function references in render:', functionReferences);

  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLowerCase().includes(sarchQuery) 
  })


  return (
    <div className='app'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox className='monster-search'  placeholder='search monsters' onChangeHandler={onChangeSearch}/>
      <CardList monsters={filteredMonsters} />
    </div>
  )
}
  
}

export default App


