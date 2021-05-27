
import React, {useState} from 'react';
import './App.css';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
} from '@material-ui/core';
import {PlayArrow, Pause, Replay10, Forward10} from '@material-ui/icons';

function App() {
  const [isPaused,setIsPaused] = useState(false);

  return (
    <div className="App">
      <Card className="Card" style={{width:'25em'}}>
        <CardHeader title={'Podcast Player'}/>
        <CardContent>
          <Button variant='contained'>
            <Replay10 />
          </Button>
          <Button variant='contained'>
            <Forward10 />
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
          <br/>
          <br/>
          <LinearProgress variable='determinate' />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
