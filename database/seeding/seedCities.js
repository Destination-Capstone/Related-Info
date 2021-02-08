/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const fs = require('fs');
const cities = require('../sampleData/cities.js');

// seed cities
const writeCities = fs.createWriteStream('./database/sampleData/cities.csv');
writeCities.write('city_id,city_name');

const seedCities = (writer, encoding, callback) => {
  for (let i = 1; i < 26; i++) {
    let good = true;
    const data = `\n${i},${cities[i]}`;
    if (good) {
      if (i !== 25) {
        good = writer.write(data, encoding);
      } else {
        writer.write(data, encoding, callback);
      }
    } else {
      writer.once('drain', seedCities);
    }
  }
};
module.exports.seed = () => {
  seedCities(writeCities, 'utf-8', () => { writeCities.end(); });
};
