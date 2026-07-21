import { Box, Typography, Grid } from '@mui/material';
import DashboardCard from '../../components/DashboardCard/DashboardCard.jsx';

const widgets = [
  { title: 'Bottle History', description: 'Track your bottle lifecycle and recycling status.' },
  { title: 'Usage Insights', description: 'Review personalized traceability recommendations.' },
  { title: 'Support', description: 'Access guidance for recycling and responsible disposal.' },
];

export default function ConsumerDashboard() {
  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Consumer Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View your product journey, verify authenticity, and access recycling support for your smart bottle.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {widgets.map((widget) => (
          <Grid item xs={12} md={4} key={widget.title}>
            <DashboardCard {...widget} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
