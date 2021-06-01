
import React, {
  useEffect,
  useState
} from 'react';
import {
  Button,
  LinearProgress,
  Grid,
  // makeStyles,
} from '@material-ui/core';
import {PlayArrow,
  Pause,
  Replay10, Forward10,
} from '@material-ui/icons';

// const useStyles = makeStyles({
//   header: {
//     backgroundColor: '#dbdbdb'
//   },
// });

let SECOND_TIMER;

export const PodcastPlayer = ({
  queuedAudio,
  currEpisode,
}) => {
  // const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const startSecondTimer = () => {
    let start = currTime;
    const increment = 1;
    SECOND_TIMER = setInterval(()=>{
      setCurrTime(start+increment)
      start++;
    },1000);
  }

  const handlePlay = () => {
    queuedAudio.play().then((res)=>{
      setIsPlaying(true);
      startSecondTimer();
    })
    .catch((err)=>{
      console.log('this is your error', err);
    });  
  };

  const handlePause = () => {
    queuedAudio.pause();
    setIsPlaying(false);
    clearInterval(SECOND_TIMER);
  };

  useEffect(()=>{
    if ( queuedAudio !== null ) {
      queuedAudio.addEventListener('canplaythrough', event => {
        setDuration(Math.round(queuedAudio?.duration));
        setCanPlay(true);
      });
      queuedAudio.addEventListener('ended', event => {
        console.log('weve ended');
        setIsPlaying(false);
      });
    }
  },[queuedAudio]);

  return (
    <>
      <Button variant='contained'>
        <Replay10 />
      </Button>
      {
        isPlaying ? (
          <Button onClick={handlePause} variant='contained'>
            <Pause />
          </Button>
        ) :
        (
          <Button onClick={handlePlay} variant='contained' disabled={!canPlay}>
            <PlayArrow />
          </Button>    
        )
      }
      <Button variant='contained'>
        <Forward10 />
      </Button>
      <br/>
      <br/>
      <Grid direction='row' container justify='space-between'>
        <Grid item>{currTime}</Grid>
        <Grid item>{duration}</Grid>
      </Grid>
      <br/>
      <LinearProgress variable='determinate' />
    </>
  );
}