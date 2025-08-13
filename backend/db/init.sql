-- Run this on your PostgreSQL server to create DB objects
-- Example: createdb hmsdb; psql -d hmsdb -f init.sql

DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  age INTEGER,
  gender VARCHAR(10),
  contact VARCHAR(50),
  notes TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES users(id),
  scheduled_at TIMESTAMP NOT NULL,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed roles
INSERT INTO roles (name) VALUES ('Admin'), ('Doctor'), ('Nurse'), ('Receptionist'), ('Patient');

-- Seed an admin user -- change password later
-- We'll store a bcrypt hash placeholder. We'll replace with a real hash using Node script or manually.
-- Better approach: run the register endpoint to create an admin. But to seed a known admin, compute a bcrypt hash.
-- For example password: Admin@123 (generate hash in Node or use an online tool).
-- For this seed, leave a note to create admin via API.
