import { Bar } from 'react-chartjs-2';
import React from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';
import { Box, Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
    
export const options = {
    plugins: {
    // title: {
    //     display: true,
    //     text: 'Chart.js Bar Chart - Stacked',
    // },
    },
    responsive: true,
    interaction: {
    mode: 'index',
    intersect: false,
    },
    scales: {
    x: {
        stacked: false,
    },
    y: {
        stacked: false,
    },
    },
};


const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: 'This year',
        maxBarThickness: 10
      },
      {
        backgroundColor: '#f2d8d8',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: 'Last year',
        maxBarThickness: 10
      }
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug']
  };
    
function BarChart() {
    return (
        <Card sx={{height: '400px'}}>
            <CardHeader
                action={(
                <Button
                    endIcon={<ArrowDropDownIcon fontSize="small" />}
                    size="small"
                >
                    Last 7 days
                </Button>
                )}
                title="Latest Sales"
            />
            <Divider />
            <CardContent>
                <Box
                sx={{
                    height: 400,
                    position: 'relative'
                }}
                >
                <Bar
                    data={data}
                    options={options}
                />
                </Box>
            </CardContent>
        </Card>
    );
};

export default BarChart