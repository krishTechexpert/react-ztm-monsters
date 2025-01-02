import styled from "styled-components";
import {BaseButton,GoolgeSignInButton,InvertedButton} from "../button/button-styles"
export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 60px;
  right: 10px;
  z-index: 5;
  button {
    margin-top:auto
  }
  ${BaseButton},${GoolgeSignInButton},${InvertedButton}{
    margin-top:auto 
  }  
`
// nestted style selector
// CartDropdownContainer contains child button, both case you can used either above dynamic and or hard coded button {margin-top:auto}
export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`
export const CartItemsLoop = styled.div`
    max-height: 240px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`
