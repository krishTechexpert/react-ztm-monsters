import React from 'react'
import "./button-styles.scss"

const BUTTON_TYPES_CLASSES = {
  google:'google-sign-in',
  inverted:'inverted'
}

export default function Button({children,buttonType='',...otherprops}) {
  return (
    <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherprops}>{children}</button>
  )
}
