import { useState } from 'react'

import './App.css'
import React from 'react';
class App extends React.Component {
  constructor(){
    super();
    this.state={
      name:{fn:'krish',ln:'kumar'},
      company:'google'
    }
  }
render(){
  console.log('render')
  return (
    <>
      hello,{this.state.name.fn} {this.state.name.ln}  and I worked at {this.state.company.ln}
      <button onClick={() => {
        this.setState(() => {
          return {
            name:{fn:'html',ln:'css'}
          }
        },() => console.log(this.state))// asynschronus
      console.log(this.state)
      }}>change name</button>
    </>
  )
}
  
}

export default App
