import { Box } from '@mui/material';

import SubwayCard from "./SubwayCard";

function SubwayList({ trainTimeData }) {

    console.log(trainTimeData)

    return (
        <Box sx={{width: '100%', textAlign: 'center'}}>
            {
                trainTimeData ? (
                    trainTimeData.map(data => {
                        return (
                            <Box sx={{display: 'inline-block', margin: '8px'}}>
                                <SubwayCard trainID={data['train_id']} secsAway={data['secs_away']} />
                            </Box>
                        )
                    })
                ) : (
                    'Loading...'
                )
            }
        </Box>
    );
}

export default SubwayList;