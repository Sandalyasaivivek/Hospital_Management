// src/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { testConnection } = require('./config/db');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);

app.get('/', (req, res) => res.send({ message: "API is running" }));

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await testConnection();  // Test DB connection first
    app.listen(PORT, () => {
      console.log(` Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to DB connection error.');
    process.exit(1); // Exit process if DB connection fails
  }
}

startServer();
