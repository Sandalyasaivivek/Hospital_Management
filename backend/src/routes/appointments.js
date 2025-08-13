// src/routes/appointments.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require("../middleware/auth"); 
const requireRole = require('../middleware/rbac');

// Create appointment (Receptionist, Admin)
router.post('/', auth, requireRole(['Receptionist','Admin']), async (req, res) => {
  const { patient_id, doctor_id, scheduled_at, reason } = req.body;
  try {
    const r = await db.query(
      'INSERT INTO appointments (patient_id, doctor_id, scheduled_at, reason) VALUES ($1,$2,$3,$4) RETURNING *',
      [patient_id, doctor_id, scheduled_at, reason]
    );
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get appointments - doctors see their appts, admins see all
router.get('/', auth, requireRole(['Doctor','Nurse','Admin','Receptionist']), async (req, res) => {
  try {
    let q = 'SELECT a.*, p.name as patient_name, d.name as doctor_name FROM appointments a JOIN patients p ON a.patient_id=p.id LEFT JOIN users d ON a.doctor_id=d.id';
    const params = [];
    if (req.user.role === 'Doctor') {
      q += ' WHERE a.doctor_id=$1';
      params.push(req.user.id);
    }
    q += ' ORDER BY a.scheduled_at DESC';
    const r = await db.query(q, params);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update status (Doctor, Admin)
router.patch('/:id/status', auth, requireRole(['Doctor','Admin']), async (req, res) => {
  const { status } = req.body;
  try {
    const r = await db.query('UPDATE appointments SET status=$1 WHERE id=$2 RETURNING *', [status, req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
