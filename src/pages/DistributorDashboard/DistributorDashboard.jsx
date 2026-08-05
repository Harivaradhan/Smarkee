import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, Divider } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
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

function buildBarData(data) {
  // Use API data if available
  if (
    data &&
    data.demand_summary &&
    Array.isArray(data.demand_summary.demand_analysis)
  ) {
    const demand = data.demand_summary.demand_analysis;

    return {
      labels: demand.map(item => item.product_name),
      datasets: [
        {
          label: "Demand Score",
          data: demand.map(item => item.demand_score),
          backgroundColor: "#1976D2",
          borderRadius: 6,
        },
      ],
    };
  }

  // Fallback to local mock data
  return {
    labels: distributorData.products,
    datasets: [
      {
        label: "Demand",
        data: distributorData.demandByCity["Kochi"],
        backgroundColor: "#1976D2",
        borderRadius: 6,
      },
    ],
  };
}

export default function DistributorDashboard() {
  
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.60.20.124:8000/analytics/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const summary = dashboardData
  ? {
      totalDistributed: dashboardData.sales_summary.total_sales,
      totalRecycled: distributorData.summary.totalRecycled,
      activeCities: Object.keys(
        dashboardData.sales_summary.sales_by_location
      ).length,

      // Highest demand score product
      highestDemandProduct:
        dashboardData.recommendations?.top_product?.product_name || "-",

      recyclingRate: distributorData.summary.recyclingRate,
    }
  : distributorData.summary;

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
              <DashboardMetricCard title="Highest Consuming Product" value={summary.highestDemandProduct} />
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
<Bar
  data={buildBarData(dashboardData)}
  options={{
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }}
/>         </DashboardSectionCard>
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

   {dashboardData?.recommendations?.length > 0
  ? dashboardData.recommendations.map((item, idx) => (
      <Box key={idx} sx={{ mb: 1 }}>
        <Typography variant="body2">
          • {item.product} ({item.location})
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {item.recommendation}
        </Typography>
      </Box>
    ))
  : distributorData.insights.map((ins, idx) => (
      <Box key={idx} sx={{ mb: 1 }}>
        <Typography variant="body2">
          • {ins}
        </Typography>
      </Box>
    ))
}

  </CardContent>
</Card>

          <Box sx={{ mt: 2 }}>
            <DashboardSectionCard title="Top Demand by City">
          {dashboardData
  ? dashboardData.demand_summary.demand_analysis.map((row) => (
      <Box
        key={row.product_name}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {row.location}
        </Typography>

        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2">
            {row.product_name}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Demand Score : {row.demand_score}
          </Typography>
        </Box>
      </Box>
    ))
  : distributorData.topDemandByCity.map((row) => (
      <Box
        key={row.city}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="body2">
          {row.city}
        </Typography>

        <Typography variant="body2">
          {row.product}
        </Typography>
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
            <DashboardTable rows={
  dashboardData
    ? dashboardData.demand_summary.demand_analysis.map((item) => ({
        city: item.location,
        product: item.product_name,
        sales: item.sales_quantity,
        transactions: item.transaction_count,
        demandScore: item.demand_score,
        category: item.demand_category,
      }))
    : distributorData.tableRows
}/>
          </DashboardSectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}