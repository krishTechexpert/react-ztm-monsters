import React from 'react'
import {BaseButton,GoolgeSignInButton,InvertedButton} from  "./button-styles.jsx"

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



export default function Button({children,buttonType=BUTTON_TYPES_CLASSES.default,...otherprops}) {
  const CustomButton = getButtons(buttonType)
  return (
    <CustomButton  {...otherprops}>{children}</CustomButton>
  )
}
