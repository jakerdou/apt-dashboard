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

  const getWeatherData = async () => {
    const weatherData = await fetchWeatherData({
      latitude: 40.76,
      longitude: 73.97,
      daily: ['apparent_temperature_max', 'apparent_temperature_min', 'sunrise', 'sunset'],
      current: ['apparent_temperature', 'is_day', 'cloud_cover', 'precipitation', 'rain', 'showers', 'snowfall', 'weather_code'],
    })

    console.log('weather data', weatherData);

    return weatherData
  }

  useEffect(() => {
    const getWeatherData = async () => {
      const weatherData = await fetchWeatherData({
        latitude: 40.76,
        longitude: -73.97,
        timezone: 'America/New_York',
        temperature_unit: 'fahrenheit',
        precipitation_unit: 'inch',
        forecast_days: 1,
        daily: ['apparent_temperature_max', 'apparent_temperature_min', 'sunrise', 'sunset'],
        current: ['apparent_temperature', 'is_day', 'cloud_cover', 'precipitation', 'rain', 'showers', 'snowfall', 'weather_code'],
      })
  
      console.log('weather data', weatherData);

      setTemp(Math.round(weatherData.current.apparent_temperature))
      console.log('high', weatherData.daily.apparent_temperature_max, typeof weatherData.daily.apparent_temperature_max);
      setLow(Math.round(weatherData.daily.apparent_temperature_min))
      setHigh(Math.round(weatherData.daily.apparent_temperature_max))
      console.log('code here', weatherData.current.weather_code);
      setWMOCode(weatherData.current.weather_code)
      setIsDay(weatherData.current.is_day)
    }

    getWeatherData()

    const interval = setInterval(() => {
        getWeatherData()
     }, 1800000)
     
     return () => {
         clearInterval(interval);
     };
  }, []);

  // console.log(weatherData);

  console.log('descs', wmoCodeDescriptions);
  console.log('code', wmoCode);

  return (
    <div>
        
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="WeatherCard"
          sx={{borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.5) -2px 2px 3px', width: '20%', marginLeft: '40%', marginTop: '16px'}}
        >
          <Box sx={{width: '50%'}}>
            {typeof wmoCode === 'number' ? <img style={{height: '200px', margin: '-24px'}} src={wmoCodeDescriptions[wmoCode][isDay ? 'day' : 'night']['image']} /> : null}
          </Box>
          <Box sx={{width: '50%'}}>
            <Box sx={{fontSize: '3em'}}>
              {temp || 'N/A'}°
            </Box>
            <Box sx={{fontSize: '2em'}}>
              {low}° / {high}°
            </Box>
          </Box>
        </Box>
    </div>

  );
}

export default WeatherCard;