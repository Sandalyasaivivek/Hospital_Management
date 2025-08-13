// src/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Register endpoint (Admin can create other roles if desired; allow open register for simplicity)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields' });

    // find role id
    const roleRes = await db.query('SELECT id FROM roles WHERE name=$1', [role]);
    if (roleRes.rowCount === 0) return res.status(400).json({ message: 'Invalid role' });

    const password_hash = await hashPassword(password);
    const insert = await db.query(
      'INSERT INTO users (name, email, password_hash, role_id) VALUES ($1,$2,$3,$4) RETURNING id, name, email',
      [name, email, password_hash, roleRes.rows[0].id]
    );
    return res.json({ user: insert.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ message: 'Email already exists' });
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRes = await db.query('SELECT u.id, u.name, u.email, u.password_hash, r.name as role FROM users u LEFT JOIN roles r ON u.role_id=r.id WHERE email=$1', [email]);
    if (userRes.rowCount === 0) return res.status(400).json({ message: 'Invalid credentials' });
    const user = userRes.rows[0];
    const ok = await comparePassword(password, user.password_hash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
