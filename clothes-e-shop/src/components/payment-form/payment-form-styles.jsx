import styled from "styled-components";
import { BaseButton } from "../button/button-styles";
export const PaymentFormContainer= styled.div`
  heighr:300px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
`

export const FormContainer = styled.div`
  height:100px;
  min-width:500px;
`
export const PaymentButton = styled(BaseButton)`
 margin-left:auto;
 margin-top:30px;
`