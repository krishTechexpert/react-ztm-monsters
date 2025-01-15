import React from 'react'
import {BaseButton,ButtonSpinner,GoolgeSignInButton,InvertedButton} from  "./button-styles.jsx"

export const BUTTON_TYPES_CLASSES = {
  base:'default',
  google:'google-sign-in',
  inverted:'inverted'
}

const getButtons = (buttonType=BUTTON_TYPES_CLASSES.base) => ({
  [BUTTON_TYPES_CLASSES.base]:BaseButton,
  [BUTTON_TYPES_CLASSES.google]:GoolgeSignInButton,
  [BUTTON_TYPES_CLASSES.inverted]:InvertedButton,
}[buttonType])



export default function Button({children,buttonType=BUTTON_TYPES_CLASSES.default,isLoading,...otherprops}) {
  const CustomButton = getButtons(buttonType)
  return (
    <CustomButton disabled={isLoading}  {...otherprops}>
      {isLoading ? <ButtonSpinner/> : children}
    </CustomButton>
  )
}
