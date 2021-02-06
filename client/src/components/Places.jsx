/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line import/extensions */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import { generatePhotoPlaceholderURL } from 'react-placeholder-image';
import StarRateIcon from '@material-ui/icons/StarRate';
import HomeCard from './HomeCard';
import styles from '../styles.js';

const useStyles = makeStyles(styles);

const Places = ({ homeInfo }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const PaperComponent = (props) => (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );

  const ButtonGroup = ({
    next, previous, goToSlide, ...rest
  }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <Box className={classes.carouselButtonGroup}>
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
      items: 4,
      slidesToSlide: 4,
    },
    medium: {
      breakpoint: { max: 1500, min: 1200 },
      items: 3,
      slidesToSlide: 3,
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

  const handleHomeCardClick = (clickedHome) => {
    setSelected(clickedHome);
    setImage(generatePhotoPlaceholderURL(200, 200));
    setOpen(true);
  };

  const handleCardClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <Box>
      <Carousel
        containerClass={classes.homeSlider}
        responsive={responsive}
        infinite
        renderButtonGroupOutside
        arrows={false}
        customButtonGroup={<ButtonGroup />}
      >
        { homeInfo.map((home) => (
          <HomeCard
            home={home}
            key={home.home_id}
            handleHomeCardClick={handleHomeCardClick}
          />
        ))}
      </Carousel>
      {
        !!selected && (
          <Dialog
            open={open}
            onClose={handleCardClose}
            className={classes.relatedInfoDialog}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              <Typography
                className={classes.relatedInfoDialogTitle}
              >
                {selected.home_description}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box key={selected.home_id}>
                <Box className={classes.relatedInfoDialogContent}>
                  <StarRateIcon style={{ color: 'red' }} />
                  <Typography style={{ color: 'gray' }}>
                    {selected.review_count > 0 ? `${selected.review_count} reviews` : 'New'}
                  </Typography>
                  <Typography className={classes.relatedInfoBullet}> • </Typography>
                  <Typography> {selected.city_name} </Typography>
                </Box>
                <Box className={classes.relatedInfoDialogMediaBox}>
                  <img
                    className={classes.relatedInfoDialogMedia}
                    src={image}
                    alt="Here's an upclose look"
                    height="420px"
                    width="650px"
                  />
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        )
      }
    </Box>
  );
};

export default Places;
