const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const { user_id } = req.query;

  // SQL Injection vulnerable
  const query = `SELECT * FROM orders WHERE user_id = ${user_id}`;
  const orders = db.prepare(query).all();

  res.json(orders);
});

module.exports = router;
