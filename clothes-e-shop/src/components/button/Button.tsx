import React,{FC,ButtonHTMLAttributes} from 'react'
import {BaseButton,ButtonSpinner,GoolgeSignInButton,InvertedButton} from  "./button-styles"

export enum BUTTON_TYPES_CLASSES {
  base='default',
  google='google-sign-in',
  inverted='inverted'
}
//A Map is ideal for key-value lookups and offers better performance for large datasets.

// getButtons will return styled component according to key
const getButtons = (buttonType=BUTTON_TYPES_CLASSES.base):typeof BaseButton => {
  const buttonMap = {
                      [BUTTON_TYPES_CLASSES.base]:BaseButton,
                      [BUTTON_TYPES_CLASSES.google]:GoolgeSignInButton, 
                      [BUTTON_TYPES_CLASSES.inverted]:InvertedButton,
                    };
  return (buttonMap[buttonType] || BaseButton) as typeof BaseButton;
}

// const obj = {
//   base: 'b',
//   google: 'g',
//   inverted: 'i',
// }["google"];//'g'



export type ButtonProps = {
  buttonType?:BUTTON_TYPES_CLASSES;
  isLoading?:boolean;
  //children:React.ReactNode //agar invalid property add ker di button per toh y ReactNode will not handle so we used Button:FC<ButtonProps> good approach
} & ButtonHTMLAttributes<HTMLButtonElement>

// to handle children property other good way used like
//const Button:FC<ButtonProps>// now it will automatically handlle children

const Button:FC<ButtonProps> = ({children,buttonType,isLoading,...otherprops}) => {
  const CustomButton = getButtons(buttonType)
  return (
    <CustomButton disabled={isLoading}  {...otherprops}>
      {isLoading ? <ButtonSpinner/> : children}
    </CustomButton>
  )
}
export default Button;