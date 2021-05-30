import React, {useEffect, useState} from 'react';
import {
  Card,
  Grid,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

export const EpisodeList = ({
  setCurrEpisode,
}) => {
  const [isLoading,setIsLoading] = useState(true);
  const [episodesArray,setEpisodesArray] = useState([]);

  useEffect(() => {
    const request = new Request('http://localhost:1337/episodes', {method:'GET'});
    
    fetch(request)
      .then(response => response.body)
      .then(body => body.getReader().read())
      .then(({done,value}) => {
        const uinit8Array = new Uint8Array(value);
        const decoded = new TextDecoder().decode(uinit8Array);
        setEpisodesArray(JSON.parse(decoded));
        setIsLoading(false);
      });
  },[]);

  return (
    <Grid item xs={4}>
      <Card>
        <Typography variant={'h4'}>Episode List</Typography>
        <Grid>
          <List>
          {
            isLoading ? (
              <ListItem>
                <CircularProgress />
              </ListItem>
            ) : 
            (
              episodesArray.map((episode,index)=>{
                return (
                  <ListItem key={index} onClick={()=>setCurrEpisode(episode)}>
                    <ListItemText 
                      primary={episode?.name}
                    />
                  </ListItem>
                )
              })
            )
            }
          </List>
        </Grid>
      </Card>
    </Grid>
  );
}
