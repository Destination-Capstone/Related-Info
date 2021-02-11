/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const fs = require('fs');
const resTypes = require('../sampleData/resType.js');

// seed reservation types
const writeReservationType = fs.createWriteStream('./database/sampleData/reservationType.csv');
writeReservationType.write('reservation_type_id,reservation_type');

const seedReservationTypes = async (writer, encoding, callback) => {
  for (let i = 1; i < 5; i++) {
    const data = `\n${i},${resTypes[i - 1]}`;
    if (i !== 4) {
      if (!writeReservationType.write(data, encoding)) {
        await new Promise((resolve) => writeReservationType.once('drain', resolve));
      }
    } else {
      writeReservationType.write(data, encoding, callback);
    }
  }
};

module.exports.seed = () => {
  seedReservationTypes(writeReservationType, 'utf-8', () => { writeReservationType.end(); });
};
