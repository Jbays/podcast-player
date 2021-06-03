
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Grid,
  // makeStyles,
  Slider,
} from '@material-ui/core';

// const useStyles = makeStyles({
//   timeline: {
//     backgroundColor: 'black',
//     border: '.1em solid black',
//   },
//   completed: {
//     backgroundColor: 'red',
//     height: '.5em',
//   }
// });

const convertSecondsToMinutes = (seconds) => {
  if ( seconds === 0 ) return '0:00';
  let secondsCopy = seconds;
  let convertedMin = 0;

  while ( secondsCopy > 60 ) {
    convertedMin++;
    secondsCopy = secondsCopy - 60;
  }

  if ( secondsCopy === 60 ) {
    convertedMin++;
    secondsCopy = 0;
  }

  if (secondsCopy <= 9 ) {
    return `${convertedMin}:0${secondsCopy}`
  }

  return `${convertedMin}:${secondsCopy}`
}

const ContinuousSlider = ({
  percentComplete,
  currTime,
  duration,
  queuedAudio,
  handleTimelineClick,
}) => {
  // const classes = useStyles();
  const [isEnabled,setEnabled] = useState(false);
  const [percent,setPercent] = useState(percentComplete);

  // keeps the slider updating
  useEffect(()=>{
    setPercent(percentComplete);
  },[percentComplete]);

  // slider is disabled unless audio is loaded / ready
  useEffect(()=>{
    if (queuedAudio){
      setEnabled(true);
    }
  },[queuedAudio])

  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          {convertSecondsToMinutes(currTime)}
        </Grid>
        <Grid item xs>
          <Slider
            disabled={!isEnabled}
            value={percent}
            onChange={handleTimelineClick}
            />
        </Grid>
        <Grid item>
          {convertSecondsToMinutes(duration)}
        </Grid>
      </Grid>
    </div>
  );
}

export const Timeline = ({
  currTime,
  duration,
  queuedAudio,
  handleTimelineClick,
  triggerAd,
  nextAd
}) => {
  const [percentComplete,setPercentComplete] = useState(0);
  // const [adTime,setAdTime] = useState(nextAdDuration*1000);

  console.log('nextAd', nextAd);

  useEffect(()=>{
    const pointerLocation = Math.round(100*(currTime/duration)) || 0;
    console.log('this is pointer location', pointerLocation);
    setPercentComplete(pointerLocation);
    if ( currTime === nextAd?.start ){
      triggerAd();
    }

  },[currTime, duration, nextAd, triggerAd]);

  return (
    <ContinuousSlider
      handleTimelineClick={handleTimelineClick}
      percentComplete={percentComplete}
      currTime={currTime}
      duration={duration}
      queuedAudio={queuedAudio}
    />
  );
}