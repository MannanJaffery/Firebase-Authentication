
//https://firebase-authentication-production.up.railway.app/create-payment-intent


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);
const app = express();



app.use(cors({
  origin:'https://mini-flex.vercel.app'
}));
app.use(express.json()); 



app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


