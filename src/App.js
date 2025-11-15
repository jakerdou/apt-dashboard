import React, { useState, useEffect } from 'react';
import { Box, Grid, Fade, Tooltip } from '@mui/material';

import SubwayCard from "./component/SubwayCard";
import SubwayList from "./component/SubwayList";
import BusCard from "./component/BusCard";
import WeatherCard from "./component/WeatherCard";
import DateTimeCard from "./component/DateTimeCard";

import './App.css'

const App = () => {

  const [trainTimeData, setTrainTimeData] = useState('')
  const trainDataUrl = process.env.REACT_APP_TRAIN_DATA_URL;

  useEffect(() =>{
    fetch(`${trainDataUrl}?train_id=E&train_id=M&train_id=6`, {method: 'GET'})
    // fetch('http://localhost:5000/train-time-data?train_id=E&train_id=M&train_id=6', {method: 'GET'})
      .then(response => response.json())
      .then(json => {
          console.log('train data', json);
          setTrainTimeData(json)
      })
      .catch(error => console.error(error));
    const interval = setInterval(() => {
            fetch(`${trainDataUrl}?train_id=E&train_id=M&train_id=6`, {method: 'GET'})
            // fetch('http://localhost:5000/train-time-data?train_id=E&train_id=M&train_id=6', {method: 'GET'})
                .then(response => response.json())
                .then(json => {
                    console.log('train data', json);
                    setTrainTimeData(json)
                })
                .catch(error => console.error(error));
        }, 30000);

        return () => {
            clearInterval(interval);
        };
  }, [])

  const directionLabelStyles = {
    fontSize: '3.5em'
  }

  return (
    <Box className='App' sx={{ padding: '0 16px' }}>
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '16px' }}>
        <Grid item xs={12} sm={12} md={4} height='220px'>
          <DateTimeCard />
        </Grid>
        <Grid item xs={12} sm={12} md={4} height='220px'>
          <WeatherCard />
        </Grid>
      </Grid>
      <Tooltip title="51st/Lex & 53rd/Lex Stops" arrow placement="top">
        <Box className='mt-4' sx={directionLabelStyles}>Uptown</Box>
      </Tooltip>
      <Box>
        <Fade in={!!trainTimeData['uptown']} timeout={2500} key={JSON.stringify(trainTimeData['uptown'])}>
          <Box>
            <SubwayList trainTimeData={trainTimeData['uptown']}/>
          </Box>
        </Fade>
      </Box>
      <Tooltip title="51st/Lex & 53rd/Lex Stops" arrow placement="top">
        <Box className='mt-4' sx={directionLabelStyles}>Downtown</Box>
      </Tooltip>
      <Box>
        <Fade in={!!trainTimeData['downtown']} timeout={2500} key={JSON.stringify(trainTimeData['downtown'])}>
          <Box>
            <SubwayList trainTimeData={trainTimeData['downtown']}/>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default App;
