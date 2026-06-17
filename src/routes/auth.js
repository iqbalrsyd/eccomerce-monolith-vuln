const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Hardcoded JWT secret (vulnerable)
const JWT_SECRET = 'supersecretjwtkey12345';

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // No input validation
  // No password strength check
  // Password stored in plaintext
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  const result = stmt.run(email, password);

  res.json({ id: result.lastInsertRowid, email });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // SQL Injection vulnerable
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  const user = db.prepare(query).get();

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);

  // Insecure cookie: no httpOnly, no secure, no sameSite
  res.cookie('session', token);

  res.json({ token });
});

module.exports = router;
