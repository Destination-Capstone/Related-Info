/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line import/extensions */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ActivityCard from './ActivityCard';
import styles from '../styles.js';

const useStyles = makeStyles(styles);

const Activities = ({ activityInfo }) => {
  const classes = useStyles();

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <Box className={classes.carouselButtonGroup2}>
        <IconButton className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()}>
          <NavigateBeforeIcon className={classes.relatedInfoArrow} />
        </IconButton>
        <IconButton onClick={() => next()}>
          <NavigateNextIcon className={classes.relatedInfoArrow} />
        </IconButton>
      </Box>
    );
  };

  const responsive = {
    large: {
      breakpoint: { max: 3000, min: 1500 },
      items: 5,
      slidesToSlide: 5,
    },
    medium: {
      breakpoint: { max: 1500, min: 1200 },
      items: 4,
      slidesToSlide: 4,
    },
    small: {
      breakpoint: { max: 1200, min: 900 },
      items: 2,
      slidesToSlide: 2,
    },
    xsmall: {
      breakpoint: { max: 900, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      containerClass={classes.activitySlider}
      responsive={responsive}
      infinite
      renderButtonGroupOutside
      arrows={false}
      customButtonGroup={<ButtonGroup />}
      focusOnSelect
    >
      { activityInfo.map((activity) => (
        <ActivityCard
          activity={activity}
          key={activity.activity_id}
        />
      ))}
    </Carousel>
  );
};

export default Activities;
