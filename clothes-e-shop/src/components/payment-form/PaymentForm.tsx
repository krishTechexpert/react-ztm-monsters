import React,{useState,FormEvent} from 'react'
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js'
import Button,{BUTTON_TYPES_CLASSES} from '../button/Button'
import {PaymentFormContainer,FormContainer, PaymentButton} from "./payment-form-styles";
import { useSelector,useDispatch } from 'react-redux'
import { selectCartTotal } from '../../store/cart-slice-old/cart.selector'
import { userSelector } from '../../store/user-slice-old/user.selector'
import { StripeCardElement } from '@stripe/stripe-js';

const ifValidCardElement = (card:StripeCardElement | null): card is StripeCardElement => card !==null

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal)
  const currentUser = useSelector(userSelector)
  const [isProcessingPayment,setIsProcessingPayment]=useState(false);
  const dispatch = useDispatch();
  const paymentHandler = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!stripe || !elements){
      return;
    }
    setIsProcessingPayment(true)
    const response = await fetch('/.netlify/functions/create-payment-intent',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({amount:amount * 100})
    })
    .then(res =>res.json())
    const clientSecret= response.paymentIntent.client_secret;
    const cardDetails = elements.getElement(CardElement)

    if(!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:cardDetails,
        billing_details:{
          name:currentUser ? currentUser.displayName : 'Guest'
        }
      }
    })
    setIsProcessingPayment(false)
    if(paymentResult.error){
      alert("error"+ JSON.stringify(paymentResult.error))
    }else {
      if(paymentResult.paymentIntent.status === 'succeeded'){
      
        alert('Payment done successfully!')
      }
    }

  }

  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2>Credit Card Payment:</h2>
        <CardElement/>
        <PaymentButton>
          <Button isLoading={isProcessingPayment} onClick={paymentHandler} buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay now</Button>
          </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}
