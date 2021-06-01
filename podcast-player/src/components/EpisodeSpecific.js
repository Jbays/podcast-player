
import React, {
  useEffect,
  useState
} from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import short from '../audio/short.mp3';
import long from '../audio/long.mp3';
import { PodcastPlayer } from './PodcastPlayer';

const AUDIO_MAP = {
  short,
  long,
}

const useStyles = makeStyles({
  header: {
    backgroundColor: '#dbdbdb'
  },
});

export const EpisodeSpecific = ({
  name,
  currEpisode,
}) => {
  // console.log('currEpisode',currEpisode);
  const classes = useStyles();
  const [queuedAudio, setQueuedAudio] = useState(null);

  useEffect(()=>{
    if ( currEpisode?.id !== '' ) {
      setQueuedAudio(new Audio(AUDIO_MAP[currEpisode?.id]))
    }
  }, [currEpisode?.id]);
  
  return (
    <Grid item xs={8}>
      <Card>
        <CardHeader
          className={classes.header}
          title={
            <Typography variant={'h3'}>Podcast Player</Typography>
          }/>
        <CardHeader title={
          <Typography variant={'h5'}>{name || '<--- Select Your Episode on Left'}</Typography>
        }/>
        <CardContent>
          <PodcastPlayer
            currEpisode={currEpisode}
            queuedAudio={queuedAudio}/>
        </CardContent>
      </Card>
    </Grid>
  );
}