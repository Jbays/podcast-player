
import React, {useState} from 'react';
import './App.css';
import {
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';

import {EpisodeList} from './components/EpisodeList';
import {EpisodeSpecific} from './components/EpisodeSpecific';

const useStyles = makeStyles({
  paper:{
    backgroundColor: '#404040',
  },
  componentContainer:{
    padding: '2em',
  },
  page:{
    backgroundColor:'#f5f5f5',
    padding: '2em',
  },
})

function App() {
  const classes = useStyles();
  // const [isPaused,setIsPaused] = useState(true);
  const [currEpisode, setCurrEpisode] = useState({id:'',name:'',audio:'',markers:[]});
  return (
    <div className={classes.page}>
      <Paper className={classes.paper}>
        <Grid
          container
          direction='row'
          alignItems='flex-start'
          spacing={3}
          className={classes.componentContainer}>
          <EpisodeList setCurrEpisode={setCurrEpisode}/>
          <EpisodeSpecific
            name={currEpisode?.name}
            currEpisode={currEpisode}
            />
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
