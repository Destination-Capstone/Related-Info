const { Pool } = require('pg');

const connectionString = process.env.CONSTR || 'postgresql://collin:password@localhost:5432/aircmc';

const pool = new Pool({
  connectionString,
});

module.exports = { pool };


// const pool = new Pool({
//   user: process.env.USER || 'collin',
//   host: process.env.HOSTADD || 'localhost',
//   database: process.env.DB || 'aircmc',
//   port: 5432,
// });