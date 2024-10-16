import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

function DateTimeCard() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).replace(/ AM| PM/, '');
    };

    return (
        <div style={{ height: '100%' }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                className="DateTimeCard"
                sx={{ borderRadius: '12px', boxShadow: 'rgba(0, 0, 0, 0.5) -2px 2px 3px', marginTop: '16px', height: '100%' }}
            >
                <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ fontSize: '2em', paddingRight: '48px' }}>
                        {formatDate(dateTime)}
                    </Box>
                    <Box sx={{ fontSize: '4em' }}>
                        {formatTime(dateTime)}
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default DateTimeCard;