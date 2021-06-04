
import React, {
  useEffect,
  useState
} from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  PlayArrow,
  Pause,
  Replay10,
  Forward10,
} from '@material-ui/icons';
import {Timeline} from './Timeline';

const useStyles = makeStyles({
  buttonContainer: {
    paddingBottom: '1em',
  },
  bigButton: {
    padding: '2em',
  },
});

let SECOND_TIMER;

export const PodcastPlayer = ({
  queuedAudio,
  currEpisode,
}) => {
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [currTime, setCurrTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAd,setShowAd] = useState(false);
  const [whichAd,setWhichAd] = useState(0);
  const [nextAd, setNextAd] = useState(currEpisode?.markers[whichAd]);

  // stops the currTime from going beyond the duration.
  // will pause the player
  useEffect(()=>{
    if ( currTime > duration ){
      setCurrTime(0);
      queuedAudio.pause();
      setIsPlaying(false);
      clearInterval(SECOND_TIMER);
      setNextAd(currEpisode?.markers[0]);
    }
  },[currTime, duration])

  // only show ad if BOTH podcast player is playing
  // AND currTime equals when start of next Ad
  useEffect(()=>{
    if (isPlaying){
      if ( currTime === nextAd?.start){
        setShowAd(true);
      }
      if ( currTime === (nextAd?.start + nextAd?.duration) ){
        setShowAd(false);
        const nextAdIndex = whichAd+1;
        setWhichAd(nextAdIndex);
        const thisIsNextAd = currEpisode?.markers[nextAdIndex];
        setNextAd(thisIsNextAd);
        if ( thisIsNextAd?.start === currTime ) {
          setShowAd(true);
        }
      }
    }
  },[isPlaying,currTime]);

  // if audio in queue OR current episode id changes, reset settings
  useEffect(()=>{
    setCurrTime(0);
    queuedAudio?.pause();
    setIsPlaying(false);
    clearInterval(SECOND_TIMER);
    setNextAd(currEpisode?.markers[0]);
  }, [queuedAudio, currEpisode?.id]);

  const startSecondTimer = (startTime=0) => {
    let increment = 1;
    SECOND_TIMER = setInterval(()=>{
      setCurrTime(startTime+increment);
      increment++;
    },1000);
  }

  const handleSkipBack = () => {
    queuedAudio.pause();
    clearInterval(SECOND_TIMER);
    const newTimestamp = Math.round(queuedAudio.currentTime-10);
    // if user skips back prior to the beginning of the audio
    if ( newTimestamp <= 0 ) {
      queuedAudio.currentTime = 0;
      setCurrTime(0);
      startSecondTimer(0);
      setNextAd(currEpisode?.markers[0]);
    } else {
      queuedAudio.currentTime = newTimestamp;
      setCurrTime(newTimestamp);
      startSecondTimer(newTimestamp);
    }
    queuedAudio.play();
    setIsPlaying(true);
  };

  const handleSkipForward = () => {
    queuedAudio.pause();
    clearInterval(SECOND_TIMER);
    const newTimestamp = Math.round(queuedAudio.currentTime+10);
    // if user skips forward past the total length of the audio
    if ( newTimestamp >= duration ) {
      queuedAudio.currentTime = duration;
      setCurrTime(duration);
    } else {
      queuedAudio.currentTime = newTimestamp;
      setCurrTime(newTimestamp);
      startSecondTimer(newTimestamp);
      queuedAudio.play();
      setIsPlaying(true);
    }
  }

  const handleTimelineClick = (event, value) => {
    queuedAudio.pause();
    clearInterval(SECOND_TIMER);
    const newTimestamp = Math.round((value/100)*duration);
    queuedAudio.currentTime = newTimestamp;
    setCurrTime(newTimestamp);
    
    if ( isPlaying ){
      startSecondTimer(newTimestamp);
      queuedAudio.play();
    }
  }

  const handlePlay = (currentTime) => {
    queuedAudio.play().then((res)=>{
      setIsPlaying(true);
      startSecondTimer(currentTime);
    })
    .catch((err)=>{
      console.log('this is your error', err);
    });  
  };

  const handlePause = () => {
    queuedAudio?.pause();
    setIsPlaying(false);
    clearInterval(SECOND_TIMER);
  };

  useEffect(()=>{
    if ( queuedAudio !== null ) {
      queuedAudio.addEventListener('canplaythrough', event => {
        const duration = Math.round(queuedAudio?.duration);
        setDuration(duration);
        setCanPlay(true);
      });
      queuedAudio.addEventListener('ended', event => {
        setIsPlaying(false);
      });
    }
  },[queuedAudio]);

  const handleAdRender = (adObj) => {
    const adType = adObj?.type;
    if ( adType === 'ad' ) {
      return (
        <a target='_blank' href={adObj?.link}>
          {adObj?.content}
        </a>
      );
    } else if (adType === 'text' ) {
      return (
        <div>{adObj?.content}</div>
      )
    } else if (adType === 'image') {
      console.log('process.env.NODE_ENV',process.env.NODE_ENV);
      return (
        <div>
          <img
            style={{width: '5em'}}
            src={`../${adObj.content}`}
            alt='slices of crispy delicious bacon'/>
        </div>
      )
    }
  }

  return (
    <>
      <Grid container direction='row' justify='space-between'>
        <ButtonGroup className={classes.buttonContainer}>
          <Button onClick={handleSkipBack} variant='contained'>
            <Replay10 />
          </Button>
          {
            isPlaying ? (
              <Button className={classes.bigButton} onClick={handlePause} variant='contained'>
                <Pause />
              </Button>
            ) :
            (
              <Button className={classes.bigButton} onClick={()=>handlePlay(currTime)} variant='contained' disabled={!canPlay}>
                <PlayArrow />
              </Button>    
            )
          }
          <Button onClick={handleSkipForward} variant='contained'>
            <Forward10 />
          </Button>
        </ButtonGroup>
        {
          showAd ? handleAdRender(nextAd) : null
        }
      </Grid>
      <Timeline
        currTime={currTime}
        duration={duration}
        handleTimelineClick={handleTimelineClick}
        queuedAudio={queuedAudio}/>
    </>
  );
}