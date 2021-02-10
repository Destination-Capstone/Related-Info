const { Pool } = require('pg');

const connectionString = process.env.CONSTR || 'postgresql://ec2-user@3.95.166.157:5432/aircmc';

const pool = new Pool({
  connectionString,
});

module.exports = { pool };
