/* eslint-disable no-underscore-dangle */
const { pool } = require('./index.js');

pool.connect();

const query = (text, req, res) => (
  pool
    .query(text)
    .then((data) => res.send(data.rows))
    .catch((e) => res.send(e))
    .finally(() => console.log('Finished request'))
);

module.exports.City = {
  find: (req, res) => {
    const text = 'SELECT * FROM city;';
    query(text, req, res);
  },
};

module.exports.Home = {
  find: (cityId, req, res) => {
    const offset = req.query.page * 15;
    const text = `
        SELECT
          h.*,
          c.city_name,
          r.reservation_type
        FROM
          home h
        INNER JOIN city c
          ON c.city_id = h.city_id
        INNER JOIN reservation_type r
          ON r.reservation_type_id = h.reservation_type_id
        WHERE c.city_id = ${cityId}
        ORDER BY home_id ASC
        OFFSET ${offset}
        FETCH FIRST 15 ROWS ONLY;
      `;
      console.log(cityId, offset);
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
    const offset = req.query.page * 15;
    const text = `
      SELECT a.*, c.city_name
      FROM activity a INNER JOIN city c
      ON c.city_id = a.city_id
      WHERE c.city_id = ${city.city}
      ORDER BY activity_id ASC
      OFFSET ${offset}
      FETCH FIRST 15 ROWS ONLY;
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
