import React, {useEffect, useState} from 'react';
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  episodeLink: {
    cursor: 'pointer',
  },
  header: {
    backgroundColor: '#dbdbdb'
  },
  episodelist: {
    paddingTop: '0',
    paddingBottomColor: '#f6edff',
  },
});

export const EpisodeList = ({
  setCurrEpisode,
}) => {
  const classes = useStyles();

  const [isLoading,setIsLoading] = useState(true);
  const [episodesArray,setEpisodesArray] = useState([]);
  const [indexOfSelected, setIndexOfSelected] = useState(null);

  const handleClick = (episodeObj, number) => {
    setCurrEpisode(episodeObj);
    setIndexOfSelected(number);
  }

  useEffect(() => {
    const request = new Request('http://localhost:1337/episodes', {method:'GET'});
    
    fetch(request)
      .then(response => response.body)
      .then(body => body.getReader().read())
      .then(({done,value}) => {
        const uinit8Array = new Uint8Array(value);
        const decoded = new TextDecoder().decode(uinit8Array);
        const validJson = JSON.parse(decoded);
        setEpisodesArray(validJson);
        setIsLoading(false);
      });
  },[]);

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          title={
            <Typography variant={'h4'}>Available Episodes</Typography>
          }
          className={classes.header}
        />
        <Divider />
        <List className={classes.episodelist}>
          {
            isLoading ? (
              <ListItem>
                <CircularProgress />
              </ListItem>
            ) : 
            (
              episodesArray.map((episode,index)=>{
                const isSelected = index === indexOfSelected;
                return (
                  <>
                    <ListItem
                      selected={isSelected}
                      className={classes.episodeLink}
                      key={index}
                      onClick={()=>handleClick(episode,index)}>
                      <ListItemText
                        primary={episode?.name}
                      />
                    </ListItem>
                    <Divider />
                  </>
                )
              })
            )
          }
        </List>
      </Card>
    </Grid>
  );
}
