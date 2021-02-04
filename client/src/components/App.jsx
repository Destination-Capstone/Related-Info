/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable guard-for-in */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Places from './Places';
import Activities from './Activities';
import CityList from './CityList';
import CardSkeletons from './CardSkeletons';
import CityListSkeletons from './CityListSkeletons';
import styles from '../styles.js';

const axios = require('axios');

const useStyles = makeStyles(styles);

const App = () => {
  const [city, setCity] = useState('');
  const [homeInfo, setHomeInfo] = useState([]);
  const [activityInfo, setActivityInfo] = useState([]);
  const [cities, setCities] = useState([]);
  const classes = useStyles();
  const { id } = useParams();

  const propertyLocations = {
    'Hollywood, CA': [1, 3, 6, 7, 18],
    'Austin, TX': [12, 13, 15, 17, 19],
    'Oakland, CA': [4, 11, 14, 16, 20],
    'Seattle, WA': [2, 5, 8, 9, 10],
  };

  const findCityName = (paramsId) => {
    for (const key in propertyLocations) {
      const isPresent = propertyLocations[key].indexOf(parseInt(paramsId)) >= 0;
      if (isPresent) {
        return key;
      }
    }
  };

  const getActivityData = () => {
    axios.get(`http://localhost:3000/activities/${city}`)
      .then((response) => setActivityInfo(response.data))
      .catch((err) => console.log(err));
  };

  const getCities = () => {
    axios.get('http://localhost:3000/cities')
      .then((response) => setCities(response.data))
      .catch((err) => console.log(err));
  };

  const getHomeData = () => {
    city
    && axios.get(`http://localhost:3000/homes/${city}`)
      .then((response) => setHomeInfo(response.data))
      .then(() => getActivityData())
      .then(() => getCities())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCity(findCityName(id));
    getHomeData();
  }, [id, city]);

  return (
    <div>
      <Box className={classes.relatedInfo}>
        { homeInfo.length
          ? (
            <Box>
              <h2>More places to stay</h2>
              <Places homeInfo={homeInfo} />
            </Box>
          )
          : <CardSkeletons />}
        { activityInfo.length
          ? (
            <Box>
              <h2>Things to do nearby</h2>
              <Activities activityInfo={activityInfo} />
            </Box>
          )
          : <CardSkeletons />}
        { cities.length
          ? (
            <Box>
              <h2>Explore other options in another city</h2>
              <CityList cities={cities} setCity={setCity} />
            </Box>
          )
          : <CityListSkeletons />}
      </Box>
    </div>
  );
};

export default App;
