// src/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/rbac');

// Get all users (Admin only)
router.get('/', auth, requireRole(['Admin']), async (req, res) => {
  try {
    const r = await db.query('SELECT u.id, u.name, u.email, r.name as role, u.created_at FROM users u LEFT JOIN roles r ON u.role_id=r.id ORDER BY u.id');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
