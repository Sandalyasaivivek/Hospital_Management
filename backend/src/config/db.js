const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to test DB connection
async function testConnection() {
  try {
    if(await pool.connect())
     console.log(' Database connected');
    else throw new Error("Database connection failed");
    
  } catch (error) {
    console.error(' Database connection failed:', error);
    throw error;
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  testConnection,
};
