const { pool } = require('./index.js');

module.exports.City = {
  find: (req, res) => {
    const text = 'SELECT * FROM city;';
    return (
      pool
        .query(text)
        .then((data) => {
          console.log(data.rows);
          return res.send(data.rows);
        })
        .catch((e) => res.send(e.stack))
        .finally(() => pool.end())
    );
  },
};

module.exports.Home = {
  find: (homeId, req, res) => {
    const firstQuery = `SELECT city_id FROM home WHERE home_id = ${homeId}`;
    return (
      pool.query(firstQuery)
        .then((data) => {
          const cityId = data.rows[0].city_id;
          const secondQuery = `SELECT * FROM home WHERE city_id = ${cityId}`;
          pool.query(secondQuery)
            .then((finalResponse) => res.send(finalResponse.rows))
            .finally(() => pool.end());
        })
        .catch((e) => res.send(e.stack))
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
