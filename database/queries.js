const { pool } = require('./index.js');

module.exports.City = {
  find: () => {
    const text = 'SELECT * FROM cities;';
    return (
      pool.query(text)
        .then((res) => res.rows)
        .catch((e) => e.stack)
        .finally(() => pool.end())
    );
  },
};

module.exports.Home = {
  find: (city) => {
    const text = `SELECT * FROM homes WHERE `;
    return (
      pool.query(text)
        .then((res) => res.rows)
        .catch((e) => e.stack)
        .finally(() => pool.end())
    );
  },
  updateOne: (id, liked) => {
    const text = `UPDATE homes`
  },
};

module.exports.Activity = {
  find: (city) => {},
  updateOne: (id, liked) => {},
};
