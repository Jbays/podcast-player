
import React, {useState} from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {PlayArrow, Pause, Replay10, Forward10} from '@material-ui/icons';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#dbdbdb'
  },
});

export const EpisodeSpecific = ({
  name,
}) => {
  const classes = useStyles();

  const [isPaused,setIsPaused] = useState(true);

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
          <Button variant='contained'>
            <Replay10 />
          </Button>
          {
            isPaused ? (
              <Button onClick={()=>setIsPaused(!isPaused)} variant='contained'>
                <PlayArrow />
              </Button>
            ) : (
              <Button onClick={()=>setIsPaused(!isPaused)} variant='contained'>
                <Pause />
              </Button>    
            )
          }
          <Button variant='contained'>
            <Forward10 />
          </Button>
          <br/>
          <br/>
          <LinearProgress variable='determinate' />
        </CardContent>
      </Card>
    </Grid>
  );
}