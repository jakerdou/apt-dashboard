import React, { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';

function WeatherCard() {
  const [temp, setTemp] = useState();
  const [high, setHigh] = useState();
  const [low, setLow] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=40.76&longitude=-73.97&current=temperature_2m,apparent_temperature&hourly=temperature_2m&temperature_unit=fahrenheit')
          .then(response => response.json())
          .then(json => {
            console.log('json', json);
            setTemp(json.current.temperature_2m)
          })
          // .then(json => {setWeatherData(json); console.log(json);})
          .catch(error => console.error(error));
     }, 1800000)
     
     return () => {
         clearInterval(interval);
     };
  }, []);

  // console.log(weatherData);

  return (
    <div className="WeatherCard">
        <Card style={{ margin: '1em', padding: '2em' }}>
            <Card.Body>
                <Card.Title>Weather</Card.Title>
                <Card.Text>
                    Temp: {temp || 'N/A'}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
}

export default WeatherCard;