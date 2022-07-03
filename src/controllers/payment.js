const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const endpointSecret = process.env.END_POINT_SECRET;
const Cart = require('../models/cart');
const { NotFound } = require('../utils/errors');
const { placeOrder } = require('./order');

const handlePayment = async (req, res) => {
  const cartId = req.body.cartId;
  const cart = await Cart.findById(cartId).populate('products.product');

  if (!cart) throw new NotFound('Cart not found');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    // Shipping details
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'BD'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],

    mode: 'payment',
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,

    phone_number_collection: {
      enabled: true,
    },
    //Products
    line_items: cart.products.map(item => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            images: item.product.images,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    }),
    metadata: {
      userEmail: req.user.email,
      cartId: cart._id.toString(),
    },
  });

  res.json({ url: session.url });
};

const completeOrder = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  if (event.type === 'checkout.session.completed') {
    console.log('✅ Success-->', data);
    const data = event.data.object;

    const orderData = {
      paymentId: data.id,
      userEmail: data.metadata.userEmail,
      cartId: data.metadata.cartId,
      address: data.customer_details.address,
      shippingAddress: data.shipping.address,
      phone: data.customer_details.phone,
      email: data.customer_details.email,
      paymentStatus: data.payment_status,
    };

    placeOrder(orderData);
  }
  res.send();
};

module.exports = {
  handlePayment,
  completeOrder,
};
