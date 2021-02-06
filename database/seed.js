/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const fs = require('fs');
const faker = require('faker');
const resTypes = require('./sampleData/resType.js');
const cities = require('./sampleData/cities.js');

//
// seed houses
const writeHouses = fs.createWriteStream('./database/sampleData/houses.csv');
writeHouses.write('home_id,city_id,reservation_type_id,house_description,price,beds,review_count,liked,superhost');

const seedHouses = (writer, encoding, callback) => {
  for (let i = 1; i < 10000000; i++) {
    const city = Math.floor(Math.random() * 25);
    const reservation_type_id = Math.floor(Math.random() * ((5 - 1) + 1));
    const review_count = Math.floor(Math.random() * 30000);
    const beds = Math.floor(Math.random() * ((5 - 1) + 1));
    const data = `\n${i},${city},${reservation_type_id},${faker.lorem.sentence()},${faker.commerce.price()},${beds},${review_count},false,false`;
    let good = true;
    if (good) {
      if (i !== 1000000 - 1) {
        good = writer.write(data, encoding);
      } else {
        writer.write(data, encoding, callback);
      }
    } else {
      writer.once('drain', seedHouses);
    }
  }
};
seedHouses(writeHouses, 'utf-8', () => { writeHouses.end(); });

//
// seed house images
const houseImageURL = 'http://d3je10agycmwlv.cloudfront.net/house_house%20interior_';
const writeHouseImages = fs.createWriteStream('./database/sampleData/houseImages.csv');
writeHouseImages.write('house_image_id,home_id,url_string');

const seedHouseImages = (writer, encoding, callback) => {
  for (let i = 1; i < 26; i++) {
    const home_id = Math.floor(Math.random() * ((25 - 1) + 1));
    const data = `\n${i},${home_id},${houseImageURL}${i}.jpg`;
    let good = true;
    if (good) {
      if (i !== 25) {
        good = writer.write(data, encoding);
      } else {
        writer.write(data, encoding, callback);
      }
    } else {
      writer.once('drain', seedHouses);
    }
  }
};
seedHouseImages(writeHouseImages, 'utf-8', () => { writeHouseImages.end(); });

//
// seed reservation types
const writeReservationType = fs.createWriteStream('./database/sampleData/reservationType.csv');
writeReservationType.write('reservation_type_id,reservation_type');

const seedReservationTypes = (writer, encoding, callback) => {
  for (let i = 1; i < 5; i++) {
    let good = true;
    const data = `\n${i},${resTypes[i - 1]}`;
    if (good) {
      if (i !== 4) {
        good = writer.write(data, encoding);
      } else {
        writer.write(data, encoding, callback);
      }
    } else {
      writer.once('drain', seedHouses);
    }
  }
};
seedReservationTypes(writeReservationType, 'utf-8', () => { writeReservationType.end(); });

//
// seed cities
const writeCities = fs.createWriteStream('./database/sampleData/cities.csv');
writeCities.write('city_id,city_name');

const seedCities = (writer, encoding, callback) => {
  for (let i = 0; i < 25; i++) {
    let good = true;
    const data = `\n${i},${cities[i]}`;
    if (good) {
      if (i !== 24) {
        good = writer.write(data, encoding);
      } else {
        writer.write(data, encoding, callback);
      }
    } else {
      writer.once('drain', seedHouses);
    }
  }
};
seedCities(writeCities, 'utf-8', () => { writeCities.end(); });

//
// seed activities
const writeActivities = fs.createWriteStream('./database/sampleData/activities.csv');
writeActivities.write('activity_id,city_id,review_count,activity_description,price,liked');

const seedActivities = (writer, encoding, callback) => {
  for (let i = 0; i < 25; i++) {
    const city = Math.floor(Math.random() * 26);
    const review_count = Math.floor(Math.random() * 10000);
    const data = `\n${i},${city},${review_count},${faker.lorem.sentence()},${faker.commerce.price()},false`;
    let good = true;
    if (good) {
      if (i !== 24) {
        good = writer.write(data, encoding);
      } else {
        writer.write(data, encoding, callback);
      }
    } else {
      writer.once('drain', seedHouses);
    }
  }
};
seedActivities(writeActivities, 'utf-8', () => { writeActivities.end(); });

//
// seed activity images
const writeActivityImages = fs.createWriteStream('./database/sampleData/activityImages.csv');
writeActivityImages.write('activity_image_id,activity_id,url_string');

const seedActivityImages = (writer, encoding, callback) => {
  for (let i = 0; i < 25; i++) {
    const randomCity = cities[Math.floor(Math.random() * ((25 - 1) + 1))].replace(/\s/g, '');
    const randomActivity = Math.floor(Math.random() * (25 - 1) + 1);
    const data = `\n${i},${randomActivity},https://loremflickr.com/320/240/${randomCity}`;
    let good = true;
    if (good) {
      if (i !== 24) {
        good = writer.write(data, encoding);
      } else {
        writer.write(data, encoding, callback);
      }
    } else {
      writer.once('drain', seedHouses);
    }
  }
};
seedActivityImages(writeActivityImages, 'utf-8', () => { writeActivityImages.end(); });
