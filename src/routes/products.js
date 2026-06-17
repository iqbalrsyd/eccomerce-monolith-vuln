const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const reviews = db.prepare('SELECT * FROM reviews WHERE product_id = ?').all(req.params.id);
  res.json({ ...product, reviews });
});

router.post('/:id/review', (req, res) => {
  const { reviewer, comment } = req.body;

  // XSS: user input stored and rendered without escaping
  const stmt = db.prepare('INSERT INTO reviews (product_id, reviewer, comment) VALUES (?, ?, ?)');
  const result = stmt.run(req.params.id, reviewer, comment);

  res.json({ id: result.lastInsertRowid, reviewer, comment });
});

module.exports = router;
