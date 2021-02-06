/* eslint-disable no-underscore-dangle */
const { pool } = require('./index.js');

const query = (text, req, res) => {
  pool.connect();
  return (
    pool
      .query(text)
      .then((data) => res.send(data.rows))
      .catch((e) => res.send(e.stack))

  );
};

module.exports.City = {
  find: (req, res) => {
    const text = 'SELECT * FROM city;';
    query(text, req, res);
  },
};

module.exports.Home = {
  find: (homeId, req, res) => {
    const text = `
      SELECT * FROM home
        WHERE city_id = (
          SELECT (city_id) FROM home
            WHERE home_id = ${homeId}
        )
      `;
    query(text, req, res);
  },
  updateOne: (id, liked, req, res) => {
    const text = `
      UPDATE home
      SET liked = ${liked.liked}
      WHERE home_id = ${id._id}
    `;
    query(text, req, res);
  },
};

module.exports.Activity = {
  find: (city, req, res) => {
    const text = `
      SELECT * FROM activity
        WHERE city_id = (
          SELECT (city_id) FROM activity
            WHERE activity_id = ${city.city}
        )
      `;
    query(text, req, res);
  },
  updateOne: (id, liked, req, res) => {
    const text = `
      UPDATE activity
      SET liked = ${liked.liked}
      WHERE activity_id = ${id._id}
    `;
    query(text, req, res);
  },
};
