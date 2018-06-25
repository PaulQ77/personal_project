import React from 'react';
import axios from 'axios';
//This will implement the checkout
import StripeCheckout from 'react-stripe-checkout';
// import logo from '../../logo.png';

//Callback converting the amount to usd.
const usdToCent = amount => amount * 100;

//NOTE TRY THIS CALLBACK FIRST
const successPayment = data => {
    alert('Payment Successful!!');
}

//Callback if unsuccessful
const errorPayment = data => {
    alert('Payment Error');
    console.log(data);
}

const onToken = (amount, description) => token => {
    //Post to the url you set in you server file.
    axios.post('/api/payment', {
        description,
        source: token.id,
        currency: 'USD',
        amount: usdToCent(amount)
        //Once you get the hang of it add a register callback via parameter in function.
    }).then(successPayment).catch(errorPayment);
    // console.log('Token-----', token);
}

//The register method is a prop. 
//It is destructured in the component..
const Checkout = ({name, description, amount, username, address}) => {
    //token is a required, becuase it is used to checkout or authorize the checkout on stripe's end.
    return  (
        <StripeCheckout
            name={name}
            email='pquiroz1977@gmail.com'
            description={'You Shopping Cart'}
            amount={usdToCent(10)}
            token={onToken(10, 'Nice Coffee Mug')}
            currency='USD'
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
            panelLabel='Buy!'
        />
    )
}

export default Checkout;