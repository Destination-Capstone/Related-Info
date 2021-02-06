const { Pool } = require('pg');

const connectionParams = {
  host: 'localhost',
  user: 'collin',
  database: 'aircmc',
};

const pool = new Pool(connectionParams);
pool.connect();

module.exports = { pool };
