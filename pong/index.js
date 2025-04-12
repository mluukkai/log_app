const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const DB_URL = process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/postgres";

const pool = new Pool({
  connectionString: DB_URL,
});

app.get('/healthz', (req, res) => {

    pool.query('SELECT 1', (err, result) => {
      if (err) {
        console.error('Health check failed:', err);
        res.status(500).send('Database connection error');
      } else {
        res.send('healthy');
      }
    });
});

/*
app.get('/', (req, res) => {
  res.send('pongroot');
});
*/

app.get('/', async (req, res) => {
  await pool.query('UPDATE pingpong SET count = count + 1');

  const dbCountResult = await pool.query('SELECT count FROM pingpong');
  const count = dbCountResult.rows[0].count;

  res.send('pong '+ count);
});

app.get('/pongs', async (req, res) => {
  const dbCountResult = await pool.query('SELECT count FROM pingpong');
  const count = dbCountResult.rows[0].count;
  res.send({ count });
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS pingpong (
        id SERIAL PRIMARY KEY,
        count INTEGER NOT NULL
      )`
    );
    const result = await pool.query('SELECT * FROM pingpong');

    if (result.rows.length === 0) {
      await pool.query('INSERT INTO pingpong (count) VALUES (0)');
    }
    console.log('Table created or already exists.');
  } catch (err) {
    console.error('Error creating table:', err);
  }
});
