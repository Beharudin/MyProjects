import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
  
const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  };
    
function PieChart() {
  return (
        <Card sx={{height: '400px'}}>
            <CardHeader title="Traffic by Device" />
            <Divider />
            <CardContent>
                <Box
                sx={{
                    height: 300,
                    position: 'relative'
                }}
                >
                <Doughnut
                    data={data}
                />
                </Box>
            </CardContent>
        </Card>
    );
};

export default PieChart