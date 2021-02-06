/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles.js';

const useStyles = makeStyles(styles);

const CityList = ({ cities, setCity }) => {
  const classes = useStyles();
  return (
    <Box className={classes.cityList}>
      { cities.map(city => (
        <Button className={classes.cities} key={city.city_id} onClick={() => setCity(city.city_id)}>
          {city.city_name}
        </Button>
      ))}
    </Box>
  );
};

export default CityList;
