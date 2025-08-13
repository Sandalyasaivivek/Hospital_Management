// src/routes/patients.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/rbac');

// Create patient (Receptionist, Admin, Doctor, Nurse)
router.post('/', auth, requireRole(['Receptionist','Admin','Doctor','Nurse']), async (req, res) => {
  const { name, age, gender, contact, notes } = req.body;
  try {
    const r = await db.query(
      'INSERT INTO patients (name, age, gender, contact, notes, created_by) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, age, gender, contact, notes, req.user.id]
    );
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List patients (Doctor, Nurse, Admin)
router.get('/', auth, requireRole(['Doctor','Nurse','Admin','Receptionist']), async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM patients ORDER BY id DESC');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get patient
router.get('/:id', auth, requireRole(['Doctor','Nurse','Admin','Receptionist','Patient']), async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM patients WHERE id=$1', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
