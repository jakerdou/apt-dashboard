import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function SubwayCard({ imgUrl, right, train_id }) {

    const [northTimes, setNorthTimes] = useState([])
    const [southTimes, setSouthTimes] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:5000/train-time-data?train_id=' + train_id, {method: 'GET'})
                .then(response => response.json())
                .then(json => {
                    console.log('train data', json);
                    setNorthTimes(json.north)
                    setSouthTimes(json.south)
                })
                .catch(error => console.error(error));
        }, 60000);

        return () => {
            clearInterval(interval);
        };        
    }, []);

    const displayTimes = times => {
        console.log(times)
        return (
            <span>
                {times.slice(0,3).map((time) => {
                    console.log(time)
                    return Math.round((time / 60) * 10) / 10 + (time === times[2] ? '' : ', ')
                })}
            </span>
        )
    }

    return (
    <div className="SubwayCard">
        <Card style={{ width: 'fit-content', margin: '1em', padding: '2em 5em', float: right ? 'right' : 'left' }}>
            <Card.Img style={{height: "10em", width: "fit-content"}} variant="top" src={imgUrl} />
            <Card.Body>
                <Card.Title>Downtown</Card.Title>
                <Card.Text>
                    In {displayTimes(southTimes)} mins
                </Card.Text>
                <Card.Title>Uptown</Card.Title>
                <Card.Text>
                    In {displayTimes(northTimes)} mins
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
    );
}

export default SubwayCard;