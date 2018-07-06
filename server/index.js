require('dotenv').config();
const express = require('express');
const massive = require('massive');
const axios = require('axios');
const session = require('express-session');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const controller = require('./controllers/controller');
const cloudinaryController = require('./cloudinary_controller');
const stripeController = require('./controllers/stripe_controller');
const app = express();




app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    secret: process.env.SESSION_SECRET,
  }));

  massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
  });

//Cloudinary endpoint
  app.get('/api/upload', cloudinaryController.upload);

//Stripe endpoint
  app.post('/api/payment', stripeController.paymentAPI);



  app.get('/api/products', controller.all_products);
  app.get('/api/product/:id', controller.one_product);
  app.put('/api/products/:id', controller.update);
  app.post('/api/product', controller.create);
  app.delete('/api/product/:id', controller.delete);

  app.get('/callback', controller.auth);
  app.post('/api/logout', controller.logout);
  app.get('/api/user-data', (req, res) => {
    res.json({ user: req.session.user });
  });
  app.post('/api/cart', controller.cart);
  app.get('/api/join', controller.join);




const PORT = 3500

app.listen(PORT, () => {
    console.log(`You're buying stuff on port ${PORT}`);
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})