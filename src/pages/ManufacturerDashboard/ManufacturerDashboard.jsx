import { Box, Typography, Grid, Paper, Avatar, Stack } from '@mui/material';
import DashboardMetricCard from '../../components/AdminDashboard/DashboardMetricCard.jsx';
import DashboardSectionCard from '../../components/AdminDashboard/DashboardSectionCard.jsx';
import AnalyticsChart from '../../components/AdminDashboard/AnalyticsChart.jsx';
import DashboardTable from '../../components/AdminDashboard/DashboardTable.jsx';
import {
  productInfo,
  metrics,
  demandTrend,
  topCities,
  tableRows,
  insights,
} from './manufacturerData.js';

export default function ManufacturerDashboard() {
  const tableColumns = [
    { field: 'region', headerName: 'Region' },
    { field: 'sold', headerName: 'Bottles Sold' },
    { field: 'recycled', headerName: 'Bottles Recycled' },
    { field: 'recycling', headerName: 'Recycling %' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar src={productInfo.image} sx={{ width: 96, height: 96 }} />
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {productInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {productInfo.id} • {productInfo.category} • {productInfo.size}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Status: {productInfo.status}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {metrics.map((m) => (
          <Grid item xs={12} sm={6} md={3} key={m.label}>
            <DashboardMetricCard {...m} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <DashboardSectionCard title="Demand Trend">
            <AnalyticsChart type="line" data={demandTrend} options={{ plugins: { legend: { display: false } } }} />
          </DashboardSectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <DashboardSectionCard title="Top Demand Cities">
            <AnalyticsChart type="bar" data={topCities} options={{ plugins: { legend: { display: false } } }} />
          </DashboardSectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <DashboardSectionCard title="Regional Performance">
            <DashboardTable columns={tableColumns} rows={tableRows} />
          </DashboardSectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardSectionCard title="Insights">
            <Stack spacing={2}>
              {insights.map((i, idx) => (
                <Paper key={idx} sx={{ p: 2, borderRadius: 2 }}>{i}</Paper>
              ))}
            </Stack>
          </DashboardSectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
