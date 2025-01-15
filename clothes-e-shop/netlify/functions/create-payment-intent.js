// we need this dotenv as we are writing serverless function in Netlify
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// to run netlify serverless function on netlify
// npm i stripe dotenv
//netlify login
//netlify run

exports.handler = async(event) => {
  try{
    const {amount} = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency:"USD",
      payment_method_types:["card"]
    })
    return {
      statusCode:200,
      body:JSON.stringify({paymentIntent})
    }
  }catch(error){
    console.log(error)
    return {
      status:400,
      body:JSON.stringify({error})
    }
  }
}