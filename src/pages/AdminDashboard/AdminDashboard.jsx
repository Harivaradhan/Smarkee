import { Box, Typography, Grid, Stack, Button, Paper, Chip } from '@mui/material';
import DashboardMetricCard from '../../components/AdminDashboard/DashboardMetricCard.jsx';
import DashboardSectionCard from '../../components/AdminDashboard/DashboardSectionCard.jsx';
import AnalyticsChart from '../../components/AdminDashboard/AnalyticsChart.jsx';
import DashboardTable from '../../components/AdminDashboard/DashboardTable.jsx';
import SmartBinMap from '../../components/SmartBinMap/SmartBinMap.jsx';
import { people, smartBins, notifications } from './adminData.js';
import {
  People as PeopleIcon,
  Factory as FactoryIcon,
  LocalShipping as LocalShippingIcon,
  Recycling as RecyclingIcon,
  EvStation as EvStationIcon,
  InsertChart as InsertChartIcon,
  TrendingUp as TrendingUpIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';

const metrics = [
  { label: 'Total Users', value: '12,458', trend: '+12.5%', icon: <PeopleIcon color="primary" />, color: '#1e3e2b' },
  { label: 'Manufacturers', value: '384', trend: '+14.3%', icon: <FactoryIcon color="primary" /> },
  { label: 'Distributors', value: '42', trend: '+10.8%', icon: <LocalShippingIcon color="primary" /> },
  { label: 'Recyclers', value: '12', trend: '+20.0%', icon: <RecyclingIcon color="primary" /> },
  { label: 'Active Smart Bins', value: '480', trend: '+6.7%', icon: <EvStationIcon color="primary" /> },
  { label: 'Bottles Collected Today', value: '19,200', trend: '+8.2%', icon: <InsertChartIcon color="primary" /> },
  { label: 'Bottles Recycled Today', value: '11,400', trend: '+9.8%', icon: <TrendingUpIcon color="primary" /> },
  { label: 'Today’s Demand Prediction', value: '23,500', trend: '+4.5%', icon: <VerifiedUserIcon color="primary" /> },
];

const smartBinsColumns = [
  { field: 'id', headerName: 'Bin ID' },
  { field: 'location', headerName: 'Location' },
  { field: 'city', headerName: 'City' },
  { field: 'fill', headerName: 'Fill Percentage' },
  { field: 'battery', headerName: 'Battery Percentage' },
  { field: 'status', headerName: 'Status' },
];

const registrationsColumns = [
  { field: 'company', headerName: 'Company Name' },
  { field: 'gst', headerName: 'GST Number' },
  { field: 'city', headerName: 'City' },
  { field: 'contact', headerName: 'Contact Person' },
  { field: 'date', headerName: 'Registration Date' },
  { field: 'status', headerName: 'Status' },
  { field: 'action', headerName: 'Action' },
];

const pendingApprovals = [
  { label: 'Manufacturers', value: 9 },
  { label: 'Distributors', value: 5 },
  { label: 'Recyclers', value: 4 },
];

export default function AdminDashboard() {
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bottles Collected',
        data: [120, 132, 148, 160, 172, 190, 210],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46,125,50,0.16)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const manufacturersChartData = {
    labels: ['NaturaPack', 'GreenFill', 'AquaFlow', 'EcoGlass', 'PureBottle'],
    datasets: [
      {
        label: 'Bottles Collected',
        data: [520, 430, 380, 320, 270],
        backgroundColor: ['#2E7D32', '#1976D2', '#388E3C', '#0288D1', '#66BB6A'],
      },
    ],
  };

  const productsChartData = {
    labels: ['AquaFresh', 'EcoSpark', 'PureLeaf', 'GreenSip', 'VitalDrop'],
    datasets: [
      {
        label: 'Demand Index',
        data: [88, 76, 64, 54, 46],
        backgroundColor: '#1565C0',
      },
    ],
  };

  const forecastChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Predicted Demand',
        data: [220, 235, 248, 260, 275, 290, 305],
        borderColor: '#1565C0',
        backgroundColor: 'rgba(21,101,192,0.18)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const stateChartData = {
    labels: ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Kerala', 'Andhra Pradesh'],
    datasets: [
      {
        label: 'Bottles Collected',
        data: [320, 210, 185, 150, 120],
        backgroundColor: '#2E7D32',
      },
    ],
  };

  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, Admin! Here’s an overview of SMARKEE traceability operations.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary">Export Report</Button>
          <Button variant="outlined" color="primary">Refresh Data</Button>
        </Stack>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.label}>
            <DashboardMetricCard {...metric} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardSectionCard title="Bottles Collected Over Time">
            <AnalyticsChart
              type="line"
              data={lineChartData}
              options={{
                plugins: { legend: { display: false } },
                scales: { x: { ticks: { maxTicksLimit: 7 } }, y: { beginAtZero: true } },
              }}
            />
          </DashboardSectionCard>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardSectionCard title="Top Manufacturers">
            <AnalyticsChart
              type="bar"
              data={manufacturersChartData}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { maxTicksLimit: 5 } } },
              }}
            />
          </DashboardSectionCard>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardSectionCard title="Top Products">
            <AnalyticsChart
              type="bar"
              data={productsChartData}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { maxTicksLimit: 5 } } },
              }}
            />
          </DashboardSectionCard>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardSectionCard title="7-Day Demand Forecast">
            <AnalyticsChart
              type="line"
              data={forecastChartData}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </DashboardSectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <DashboardSectionCard title="State-wise Collection">
            <AnalyticsChart
              type="bar"
              data={stateChartData}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { maxTicksLimit: 6 } } },
              }}
            />
          </DashboardSectionCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardSectionCard title="Pending Approvals">
            <Stack spacing={2}>
              {pendingApprovals.map((item) => (
                <Paper
                  key={item.label}
                  sx={{ p: 2, borderRadius: 3, boxShadow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>{item.label}</Typography>
                    <Typography variant="h5">{item.value}</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" size="small">Approve</Button>
                    <Button variant="outlined" size="small" color="error">Reject</Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </DashboardSectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <DashboardSectionCard title="Smart Bin Analytics">
            <DashboardTable columns={smartBinsColumns} rows={smartBins} />
          </DashboardSectionCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardSectionCard title="Recent Manufacturer Registrations">
            <DashboardTable columns={registrationsColumns} rows={people} onView={(row) => console.log('View', row)} />
          </DashboardSectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <DashboardSectionCard title="Smart Bin Map">
            <SmartBinMap height={420} />
          </DashboardSectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
