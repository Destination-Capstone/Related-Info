const seedActivityImages = require('./seeding/seedActivityImages.js');
const seedActivities = require('./seeding/seedActivities.js');
const seedHouses = require('./seeding/seedHouses.js');
const seedHouseImages = require('./seeding/seedHouseImages.js');
const seedCities = require('./seeding/seedCities.js');
const seedReservationTypes = require('./seeding/seedReservationTypes.js');

seedCities.seed();
seedReservationTypes.seed();
seedHouses.seed();
seedHouseImages.seed();
seedActivities.seed();
seedActivityImages.seed();
