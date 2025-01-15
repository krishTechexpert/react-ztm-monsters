import {ChangeEventHandler, Component} from 'react';
import "./search-style.css";

interface ISearchBoxProps extends IChangeHandlerProps{
  className:string;
  placeholder?:string;
}
interface IChangeHandlerProps{
  //onChangeHandler:ChangeEventHandler<HTMLInputElement> // both way are correct
  onChangeHandler:(event:React.ChangeEvent<HTMLInputElement>) => void
  //  func:React.ChangeEventHandler you can see hover on it and check geneic type

}

const  SearchBox = ({onChangeHandler,className,placeholder}:ISearchBoxProps) => {
    return (
      <input className={`search-box ${className}`} type="search" placeholder={placeholder} onChange={onChangeHandler} />
    )
}

export default SearchBox;