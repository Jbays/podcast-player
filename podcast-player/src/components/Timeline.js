
import React, {
  useEffect,
  useState,
} from 'react';
import {
  Grid,
  makeStyles,
  Slider,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  timeline: {
    backgroundColor: 'black',
    border: '.1em solid black',
  },
  completed: {
    backgroundColor: 'red',
    height: '.5em',
  }
});

const ContinuousSlider = ({
  percentComplete,
  currTime,
  duration,
  queuedAudio,
  setCurrTime,
}) => {
  const classes = useStyles();
  const [enabled,setEnabled] = useState(false);
  const [percent,setPercent] = useState(percentComplete);

  useEffect(()=>{
    setPercent(percentComplete);
  },[percentComplete]);

  useEffect(()=>{
    if (queuedAudio){
      setEnabled(true);
    }
  },[queuedAudio])
  
  const handleChange = (event, newValue) => {
    const skipToHere = Math.round((newValue/100)*duration);
    queuedAudio.pause();
    console.log('before queuedAudio.currentTime',queuedAudio.currentTime)
    console.log('newValue/100',newValue/100)
    console.log('skipToHere',skipToHere)
    queuedAudio.currentTime = skipToHere;
    // queuedAudio.play();
    console.log('after queuedAudio.currentTime',queuedAudio.currentTime)
    setPercent(newValue);
    setCurrTime(newValue);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          {currTime}
        </Grid>
        <Grid item xs>
          <Slider disabled={!enabled} value={percent} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          {duration}
        </Grid>
      </Grid>
    </div>
  );
}

export const Timeline = ({
  currTime,
  duration,
  queuedAudio,
  setCurrTime,
}) => {
  const [percentComplete,setPercentComplete] = useState(0);

  useEffect(()=>{
    const value = Math.round(100*(currTime/duration)) || 0;
    setPercentComplete(value);
  },[currTime, duration]);

  return (
    <>
      <div>{percentComplete}%</div>
      <ContinuousSlider
        percentComplete={percentComplete}
        currTime={currTime}
        duration={duration}
        queuedAudio={queuedAudio}
        setCurrTime={setCurrTime}
      />
    </>
  );
}