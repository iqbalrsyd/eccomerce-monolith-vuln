const express = require('express');
const db = require('../db');

const router = express.Router();

// Hardcoded Stripe key (vulnerable)
const STRIPE_SECRET_KEY = 'sk_live_1234567890abcdef1234567890';

router.post('/', (req, res) => {
  const { user_id, product_id, quantity, payment_token } = req.body;

  // No CSRF token validation
  // No authentication check

  // SQL Injection vulnerable
  const productQuery = `SELECT * FROM products WHERE id = ${product_id}`;
  const product = db.prepare(productQuery).get();

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const total = product.price * quantity;

  // SQL Injection vulnerable
  const orderQuery = `INSERT INTO orders (user_id, total, payment_token) VALUES (${user_id}, ${total}, '${payment_token}')`;
  const result = db.prepare(orderQuery).run();

  // Log sensitive data
  console.log('Processing payment with Stripe key:', STRIPE_SECRET_KEY);

  res.json({
    order_id: result.lastInsertRowid,
    total,
    status: 'pending',
    message: 'Order created. Payment will be processed.'
  });
});

module.exports = router;
