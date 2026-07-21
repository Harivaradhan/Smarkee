import { Card, CardContent, Typography, Box } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

export default function AnalyticsChart({ title, type, data, options }) {
  const mergedOptions = {
    maintainAspectRatio: false,
    responsive: true,
    ...options,
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Box sx={{ minHeight: 260, width: '100%' }}>
          {type === 'line' && <Line data={data} options={mergedOptions} />}
          {type === 'bar' && <Bar data={data} options={mergedOptions} />}
        </Box>
      </CardContent>
    </Card>
  );
}
