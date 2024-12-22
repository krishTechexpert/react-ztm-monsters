import {Component} from 'react';
import "./search-style.css";
class SearchBox extends Component{
  render(){
    console.log(this.props)
    return (
      <input className={`search-box ${this.props.className}`} type="search" placeholder={this.props.placeholder} onChange={this.props.onChangeHandler} />
    )
  }
}

export default SearchBox;