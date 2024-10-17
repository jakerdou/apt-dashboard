import React, { useState, useEffect } from 'react';

import { fetchWeatherData } from '@atombrenner/openmeteo'
import { Box, Grid } from '@mui/material';

import wmoCodeDescriptions from './wmo-code-descriptions.json';

function WeatherCard() {
  const [temp, setTemp] = useState();
  const [high, setHigh] = useState();
  const [low, setLow] = useState();
  const [wmoCode, setWMOCode] = useState();
  const [isDay, setIsDay] = useState();

  // useEffect(() => {
  //   const getWeatherData = async () => {
  //     const weatherData = await fetchWeatherData({
  //       latitude: 40.76,
  //       longitude: -73.97,
  //       timezone: 'America/New_York',
  //       temperature_unit: 'fahrenheit',
  //       precipitation_unit: 'inch',
  //       forecast_days: 1,
  //       daily: ['apparent_temperature_max', 'apparent_temperature_min', 'sunrise', 'sunset'],
  //       current: ['apparent_temperature', 'is_day', 'cloud_cover', 'precipitation', 'rain', 'showers', 'snowfall', 'weather_code'],
  //     })
  
  //     console.log('weather data', weatherData);

  //     setTemp(Math.round(weatherData.current.apparent_temperature))
  //     setLow(Math.round(weatherData.daily.apparent_temperature_min))
  //     setHigh(Math.round(weatherData.daily.apparent_temperature_max))
  //     setWMOCode(weatherData.current.weather_code)
  //     setIsDay(weatherData.current.is_day)
  //   }

  //   getWeatherData()

  //   const interval = setInterval(() => {
  //       getWeatherData()
  //    }, 1800000)
     
  //    return () => {
  //        clearInterval(interval);
  //    };
  // }, []);

  console.log('descs', wmoCodeDescriptions);
  console.log('code', wmoCode);

  const [precipitation, setPrecipitation] = useState();
  const [cloudCover, setCloudCover] = useState();

  useEffect(() => {
    const getWeatherData = async () => {
      const weatherData = await fetchWeatherData({
        latitude: 40.76,
        longitude: -73.97,
        timezone: 'America/New_York',
        temperature_unit: 'fahrenheit',
        precipitation_unit: 'inch',
        forecast_days: 1,
        daily: ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset'],
        current: ['temperature_2m', 'is_day', 'cloud_cover', 'precipitation', 'rain', 'showers', 'snowfall', 'weather_code'],
      })
  
      console.log('weather data', weatherData);

      setTemp(Math.round(weatherData.current.temperature_2m))
      setLow(Math.round(weatherData.daily.temperature_2m_min))
      setHigh(Math.round(weatherData.daily.temperature_2m_max))
      setWMOCode(weatherData.current.weather_code)
      setIsDay(weatherData.current.is_day)
      setPrecipitation(weatherData.current.precipitation)
      setCloudCover(weatherData.current.cloud_cover)
    }

    getWeatherData()

    const interval = setInterval(() => {
        getWeatherData()
     }, 1800000)
     
     return () => {
         clearInterval(interval);
     };
  }, []);

  return (
    <div style={{height: '100%'}}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="WeatherCard"
          sx={{borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.5) -2px 2px 3px', marginTop: '16px', height: '100%'}}
        >
          <Box sx={{width: '50%'}}>
            {typeof wmoCode === 'number' ? <img style={{height: '250px', margin: '-24px'}} src={wmoCodeDescriptions[wmoCode][isDay ? 'day' : 'night']['image']} /> : null}
            {/* <Box sx={{fontSize: '1.5em', paddingBottom: '16px'}}>
              {'Cloud Cover: ' + cloudCover + '%'}
            </Box> */}
          </Box>
          <Box sx={{width: '50%', marginLeft: '-32px'}}>
            <Box sx={{fontSize: '3.25em'}}>
              {temp || 'N/A'}°
            </Box>
            <Box sx={{fontSize: '2.5em'}}>
              {low}° / {high}°
            </Box>
            {precipitation > 0 ? <Box sx={{fontSize: '1.5em'}}>Precipitation: {precipitation} in.</Box> : null}
          </Box>
        </Box>
    </div>
  );
}

export default WeatherCard;