
import React, {
  useEffect,
  useState
} from 'react';
import {
  Button,
  // Grid,
  makeStyles,
} from '@material-ui/core';
import {
  PlayArrow,
  Pause,
  Replay10,
  Forward10,
} from '@material-ui/icons';
import {Timeline} from './Timeline';

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

  useEffect(()=>{
    setCurrTime(0);
  }, [currEpisode?.id])

  const startSecondTimer = () => {
    let start = currTime;
    const increment = 1;
    SECOND_TIMER = setInterval(()=>{
      setCurrTime(start+increment)
      start++;
    },1000);
  }

  const handleSkipBack = () => {
    queuedAudio.currentTime = queuedAudio.currentTime-10;
    setCurrTime(Math.round(queuedAudio.currentTime));
  }

  const handleSkipForward = () => {
    queuedAudio.currentTime = queuedAudio.currentTime+10;
    setCurrTime(Math.round(queuedAudio.currentTime));
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
        setIsPlaying(false);
      });
    }
  },[queuedAudio]);

  return (
    <>
      <Button onClick={handleSkipBack} variant='contained'>
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
      <Button onClick={handleSkipForward} variant='contained'>
        <Forward10 />
      </Button>
      <br/>
      <br/>
      <Timeline
        queuedAudio={queuedAudio}
        currTime={currTime}
        setCurrTime={setCurrTime}
        duration={duration}/>
    </>
  );
}