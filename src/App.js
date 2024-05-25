import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';

import SubwayCard from "./component/SubwayCard";
import SubwayList from "./component/SubwayList";
import BusCard from "./component/BusCard";
import WeatherCard from "./component/WeatherCard";

import './App.css'

const App = () => {

  const [trainTimeData, setTrainTimeData] = useState('')

  useEffect(() =>{
    fetch('http://localhost:5000/train-time-data?train_id=E&train_id=M&train_id=6', {method: 'GET'})
      .then(response => response.json())
      .then(json => {
          console.log('train data', json);
          setTrainTimeData(json)
      })
      .catch(error => console.error(error));
    const interval = setInterval(() => {
            fetch('http://localhost:5000/train-time-data?train_id=E&train_id=M&train_id=6', {method: 'GET'})
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
    <Box className='App'>
      <Box className='mt-4' sx={directionLabelStyles}>Uptown</Box>
      <Box><SubwayList trainTimeData={trainTimeData['uptown']}/></Box>
      <Box className='mt-4' sx={directionLabelStyles}>Downtown</Box>
      <Box><SubwayList trainTimeData={trainTimeData['downtown']}/></Box>
    </Box>
  );
};

export default App;
