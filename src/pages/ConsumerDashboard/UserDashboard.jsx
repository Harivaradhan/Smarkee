import { Box, Typography, Grid } from '@mui/material';
import DashboardCard from '../../components/DashboardCard/DashboardCard.jsx';

const widgets = [
  { title: 'Production Batch', description: 'Track manufactured bottles and assign trace IDs.' },
  { title: 'Shipment Status', description: 'Monitor distributor and retailer handoffs.' },
  { title: 'Compliance Log', description: 'Review all manufacturing records and certifications.' },
];

export default function UserDashboard() {
  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View manufacturing batches, certifications, and traceability status for your smart bottles.
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
