
import React, {useState} from 'react';
import './App.css';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import {PlayArrow, Pause, Replay10, Forward10} from '@material-ui/icons';

import {EpisodeList} from './components/EpisodeList';

function App() {
  const [isPaused,setIsPaused] = useState(true);
  const [currEpisode, setCurrEpisode] = useState({id:'',name:'',audio:'',markers:[]});
  return (
    <div className="App">
      <Grid container direction='row' spacing={3}>
        <EpisodeList setCurrEpisode={setCurrEpisode}/>
        <Grid item xs={8}>
          <Card className="Card">
            <CardHeader title={
              <Typography variant={'h3'}>Podcast Player</Typography>
            }/>
            <CardHeader title={
              <Typography variant={'h5'}>{currEpisode?.name}</Typography>
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
      </Grid>
    </div>
  );
}

export default App;
