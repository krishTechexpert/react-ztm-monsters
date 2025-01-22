import React,{FC,InputHTMLAttributes} from 'react';
import {FormInputLabel,Input,Group} from "./form-input-styles.jsx";

// our input props should be releated to HTML input element//otherwise give error..kind of validation to protect <Input  {...otherProps} /> suppose otherProps contain some invalid html attribute then error show
type FormInputProps = {label:string} & InputHTMLAttributes<HTMLInputElement> // good approach

const  FormInput:FC<FormInputProps> = ({label,...otherProps}) => {
  return (
      <Group>
        <Input  {...otherProps} />
        { label &&  (<FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value=== 'string' && otherProps.value.length)}>{label}</FormInputLabel>)}
      </Group>
  )
}

export default FormInput;

// <FormInput label="Email" type="email" required  name="email" onChange={handleChange} value={email} />
// <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password} />