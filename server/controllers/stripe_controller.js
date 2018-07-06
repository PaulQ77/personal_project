//Use stripe and use the client-id, found in the stripe dashboard  
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_CLIENT_KEY);
module.exports = {
    //This method is used the endpoint for stripe.
    paymentAPI(req, res) {
        const dbInstance = req.app.get('db');
        //DO NOT EDIT BELOW!!!!!!!
        const { source, currency, amount, acct, email } = req.body;
        console.log(req.body)
        //DO NOT EDIT ABOVE!!!!!!
        //Retrieve the source, currency, amount, account and email from body, and insert it into promise of the stripe.charges.create.
        return stripe.charges.create({source, currency, amount}, {stripe_account: acct}, (stripeErr, stripeRes) => {
            if(stripeErr) {
                console.log(stripeErr)
                res.send({error: stripeErr});
            } else {
                // console.log('-------------stripe response',stripeRes);
                //If the stripe response status is succeeded that means it is a successful payment.
                if(stripeRes.status === 'succeeded') {
                    console.log("Sucessful Payment");
                    // console.log('NEW', req.session.user);
                    //Define the dbInstance that will access the database. Optional
                    // const dbInstance = req.app.get('db');
                    // Optional retreive current data.
                    let currentDate = Date.now();
                    //Create a new object with the values you would like in database Optional
                    const newReciept = {
                        last_four: Number(stripeRes.source.last4),
                        exp_date: `${stripeRes.source.exp_month}/${stripeRes.source.exp_year}`,
                        type_of_payment: `${stripeRes.source.funding} ${stripeRes.source.object}`,
                        date_of_registration: new Date().getUTCDate(),
                        email,
                        currency
                    }
                    console.log(stripeRes);
                    console.log('Reciept------', newReciept);
                    // Insert into database.
                    dbInstance.create_receipt(newReciept).then(res => {
                        console.log(res);
                    }).catch(err => console.log('Create Recirept Error---', err));
                    res.status(200).send({success: stripeRes});
                } else {
                    //Not a successful payment.
                    res.status(200).send({error: 'Payment not a success invalid payment info.'});
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
}