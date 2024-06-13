import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import { Box, Grid } from '@mui/material';

function SubwayCard({ trainID, secsAway }) {

    const displayTimes = time => {
        // console.log(time)
        return Math.round((time / 60) * 10) / 10
    }

    let imgURL = ''
    switch(trainID) {
        case 'E':
            // imgURL = 'https://transitgifts.com/cdn/shop/products/28249_1024x1024@2x.jpg?v=1559005970'
            imgURL = 'e-letter.svg'
            break;
        case 'M':
            // imgURL = 'https://transitgifts.com/cdn/shop/products/28252_1024x1024@2x.jpg?v=1559005973'
            imgURL = 'm-letter.svg'
            break;
        case '6':
            // imgURL = 'https://transitgifts.com/cdn/shop/products/28261_1024x1024@2x.jpg?v=1559005981'
            imgURL = '6-digit.svg'
            break;
    }

    let minsAwayStyle = {
        backgroundColor: secsAway < 600 ? '#00cf0054' : secsAway < 1200 ? '#ffff005e' : '#ff00004d',
        padding: '12px',
        margin: '8px', 
        fontSize: '2em',
        borderRadius: '32px',
        fontWeight: 'bold'
    }

    return (
    <div className="SubwayCard" style={{backgroundColor: 'rgb(225 225 225)', borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.5) -2px 2px 3px', padding: '8px'}}>
        <img src={imgURL} style={{height: '175px', padding: '16px'}} />
        <Box sx={minsAwayStyle}>{displayTimes(secsAway)} min.</Box>
    </div>
    );
}

export default SubwayCard;