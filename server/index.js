/* eslint-disable global-require */
/* eslint-disable arrow-parens */
/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const cors = require('cors');
const { City, Home, Activity } = require('../database/queries.js');
require('newrelic');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

////////////////////////////////////////

app.get('/cities', (req, res) => {
  City.find(req, res);
});

////////////////////////////////////////

app.get('/homes/:cityId', (req, res) => {
  const { cityId } = req.params;
  Home.find(cityId, req, res);
});

////////////////////////////////////////

app.get('/activities/:city', (req, res) => {
  const { city } = req.params;
  Activity.find({ city }, req, res);
});

////////////////////////////////////////

app.patch('/homes/:id', (req, res) => {
  const { liked } = req.body;
  const _id = req.params.id;
  Home.updateOne({ _id }, { liked }, req, res);
});

////////////////////////////////////////

app.patch('/activities/:id', (req, res) => {
  const { liked } = req.body;
  const _id = req.params.id;
  Activity.updateOne({ _id }, { liked }, req, res);
});

////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});
