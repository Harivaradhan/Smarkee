import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import distributorData from './distributorData';
import DashboardMetricCard from '../../components/AdminDashboard/DashboardMetricCard.jsx';
import DashboardSectionCard from '../../components/AdminDashboard/DashboardSectionCard.jsx';
import DashboardTable from '../../components/AdminDashboard/DashboardTable.jsx';
import SmartBinMap from '../../components/SmartBinMap/SmartBinMap.jsx';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function buildBarData() {
  const { cities, products, demandByCity } = distributorData;
  const datasets = products.map((prod, i) => ({
    label: prod,
    data: cities.map((c) => demandByCity[c][i]),
    backgroundColor: [
      '#2ecc71',
      '#3498db',
      '#f39c12',
      '#e74c3c',
    ][i % 4],
    borderRadius: 6,
  }));

  return { labels: cities, datasets };
}

export default function DistributorDashboard() {
  const summary = distributorData.summary;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
        Welcome back, Kochi Distributors
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
        Track demand, distribution and recycling across all your cities.
      </Typography>

      <Grid container spacing={2}>
        {/* Summary cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2.4}>
              <DashboardMetricCard title="Total Bottles Distributed" value={summary.totalDistributed.toLocaleString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <DashboardMetricCard title="Total Bottles Recycled" value={summary.totalRecycled.toLocaleString()} />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <DashboardMetricCard title="Active Cities" value={summary.activeCities} />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <DashboardMetricCard title="Highest Demand Product" value={summary.highestDemandProduct} />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <DashboardMetricCard title="Overall Recycling Rate" value={`${summary.recyclingRate}%`} />
            </Grid>
          </Grid>
        </Grid>

        {/* Charts and insights */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DashboardSectionCard title="Product Demand by City">
                <Bar data={buildBarData()} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </DashboardSectionCard>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Insights
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {distributorData.insights.map((ins, idx) => (
                <Box key={idx} sx={{ mb: 1 }}>
                  <Typography variant="body2">• {ins}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          <Box sx={{ mt: 2 }}>
            <DashboardSectionCard title="Top Demand by City">
              {distributorData.topDemandByCity.map((row) => (
                <Box key={row.city} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.city}</Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2">{row.product}</Typography>
                    <Typography variant="caption" color="text.secondary">{row.qty.toLocaleString()}</Typography>
                  </Box>
                </Box>
              ))}
            </DashboardSectionCard>
          </Box>
        </Grid>

        {/* Map */}
        <Grid item xs={12}>
          <DashboardSectionCard title="Smart Bin Map">
            <SmartBinMap height={380} />
          </DashboardSectionCard>
        </Grid>

        {/* Table */}
        <Grid item xs={12}>
          <DashboardSectionCard title="Product Performance by City">
            <DashboardTable rows={distributorData.tableRows} />
          </DashboardSectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
