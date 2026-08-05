import { Box, Typography, Grid, Stack, Button } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";

import DashboardMetricCard from '../../components/AdminDashboard/DashboardMetricCard.jsx';
import DashboardSectionCard from '../../components/AdminDashboard/DashboardSectionCard.jsx';
import AnalyticsChart from '../../components/AdminDashboard/AnalyticsChart.jsx';
import DashboardTable from '../../components/AdminDashboard/DashboardTable.jsx';
import SmartBinMap from '../../components/SmartBinMap/SmartBinMap.jsx';

import { people, smartBins } from './adminData.js';

import {
  People as PeopleIcon,
  Factory as FactoryIcon,
  LocalShipping as LocalShippingIcon,
  Recycling as RecyclingIcon,
  InsertChart as InsertChartIcon,
} from '@mui/icons-material';


const smartBinsColumns = [
  { field: 'id', headerName: 'Bin ID' },
  { field: 'location', headerName: 'Location' },
  { field: 'city', headerName: 'City' },
  { field: 'status', headerName: 'Status' },
];


const registrationsColumns = [
  { field: 'company', headerName: 'Company Name' },
  { field: 'gst', headerName: 'GST Number' },
  { field: 'city', headerName: 'City' },
  { field: 'contact', headerName: 'Contact Person' },
  { field: 'date', headerName: 'Registration Date' },
];


const pendingApprovals = [
  { label: 'Manufacturers', value: 9 },
  { label: 'Distributors', value: 5 },
  { label: 'Recyclers', value: 4 },
];


export default function AdminDashboard() {


  const [kpiData, setKpiData] = useState({
    totalSales: 0,
    totalRecords: 0,
    topProduct: "-",
    topLocation: "-",
    totalProducts: 0,
  });


 const fetchKpiData = async () => {

  try {

  const response = await axios.get(
  "http://13.60.20.124:8000/analytics/dashboard/"
);

    const data = response.data;


 setKpiData({
  totalSales: data.sales_summary.total_sales,
  totalRecords: data.sales_summary.total_records,
  topProduct: data.recommendations.top_product.product_name,
  topLocation: data.recommendations.top_product.location,
  totalProducts: data.demand_summary.total_products,
});


    // TOP PRODUCTS GRAPH

    const demandData = data.demand_summary.demand_analysis;


    setProductsChartData({

      labels: demandData.map(
        item => item.product_name
      ),

      datasets:[
        {
          label:"Demand Index",

          data:demandData.map(
            item => item.demand_score
          ),

          backgroundColor:"#1565C0"
        }
      ]

    });

// CITY-WISE COLLECTION GRAPH

const transactions = data.transactions;

const cityCounts = transactions.reduce((acc, transaction) => {
  const city = transaction.location;

  acc[city] = (acc[city] || 0) + 1;

  return acc;
}, {});


const sortedCities = Object.entries(cityCounts)
  .sort((a, b) => b[1] - a[1]);

setCityChartData({
  labels: sortedCities.map(([city]) => city),
  datasets: [
    {
      label: "Bottle Collections",
      data: sortedCities.map(([, count]) => count),
      backgroundColor: "#2E7D32",
    },
  ],
});

// TOP MANUFACTURER TRANSACTION BY CITY

const manufacturerCityCount = transactions.reduce(
  (acc, transaction) => {

    const city = transaction.location;


    if(city){
      acc[city] = (acc[city] || 0) + 1;
    }


    return acc;

  },
  {}
);



const sortedManufacturerCities =
Object.entries(manufacturerCityCount)
.sort((a,b)=>b[1]-a[1]);



setManufacturerTransactionChartData({

  labels:
    sortedManufacturerCities.map(
      ([city]) => city
    ),


  datasets:[
    {
      label:"Transactions",

      data:
        sortedManufacturerCities.map(
          ([,count])=>count
        ),

      backgroundColor:"#1976D2"
    }
  ]

});

  }
  catch(error){

    console.error(
      "Error fetching dashboard:",
      error
    );

  }

};


  useEffect(() => {
    fetchKpiData();
  }, []);



  const metrics = [
    {
      label: "Total Sales",
      value: kpiData.totalSales,
      icon: <InsertChartIcon color="primary" />
    },
    {
      label: "Total Records",
      value: kpiData.totalRecords,
      icon: <PeopleIcon color="primary" />
    },
    {
      label: "Highest Consuming Product",
      value: kpiData.topProduct,
      icon: <FactoryIcon color="primary" />
    },
    {
      label: "Top Location",
      value: kpiData.topLocation,
      icon: <LocalShippingIcon color="primary" />
    },
    {
      label: "Total Products",
      value: kpiData.totalProducts,
      icon: <RecyclingIcon color="primary" />
    },
    {
      label: "Manufacturers",
      value: pendingApprovals.find((item) => item.label === 'Manufacturers')?.value ?? 0,
      icon: <FactoryIcon color="primary" />
    },
    {
      label: "Distributors",
      value: pendingApprovals.find((item) => item.label === 'Distributors')?.value ?? 0,
      icon: <LocalShippingIcon color="primary" />
    },
    {
      label: "Recyclers",
      value: pendingApprovals.find((item) => item.label === 'Recyclers')?.value ?? 0,
      icon: <RecyclingIcon color="primary" />
    }
  ];



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
        backgroundColor: [
          '#2E7D32',
          '#1976D2',
          '#388E3C',
          '#0288D1',
          '#66BB6A'
        ],
      },
    ],
  };


  const [productsChartData, setProductsChartData] = useState({
  labels: [],
  datasets: [
    {
      label: "Demand Index",
      data: [],
      backgroundColor: "#1565C0",
    },
  ],
});

const [cityChartData, setCityChartData] = useState({
  labels: [],
  datasets: [
    {
      label: "Bottle Collections",
      data: [],
      backgroundColor: "#2E7D32",
    },
  ],
});
const [manufacturerTransactionChartData, setManufacturerTransactionChartData] =
useState({
  labels: [],
  datasets: [
    {
      label: "Transactions",
      data: [],
      backgroundColor: "#2E7D32",
    },
  ],
});

  const forecastChartData = {
    labels: [
      'Day 1',
      'Day 2',
      'Day 3',
      'Day 4',
      'Day 5',
      'Day 6',
      'Day 7'
    ],
    datasets: [
      {
        label: 'Predicted Demand',
        data: [220,235,248,260,275,290,305],
        borderColor: '#1565C0',
        backgroundColor: 'rgba(21,101,192,0.18)',
        fill: true,
        tension: 0.3,
      },
    ],
  };


    return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}
      >

        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Admin Dashboard
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Welcome back, Admin! Here’s an overview of SMARKEE traceability operations.
          </Typography>
        </Box>


        <Stack direction="row" spacing={2}>

          <Button
            variant="outlined"
            color="primary"
            onClick={fetchKpiData}
          >
            Refresh Data
          </Button>

        </Stack>

      </Box>



      {/* KPI CARDS */}

      <Grid container spacing={2} sx={{ mt: 3 }}>

        {metrics.map((metric) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={metric.label}
          >

            <DashboardMetricCard {...metric} />

          </Grid>

        ))}

      </Grid>





      {/* CHART SECTION */}

      <Grid
  container
  spacing={2}
  justifyContent="center"
  sx={{ mt: 2 }}
>


        <Grid item xs={12} md={6} lg={3}>

          <DashboardSectionCard title="Bottles Collected Over Time">

            <AnalyticsChart
              type="line"
              data={lineChartData}
              options={{
                plugins:{
                  legend:{
                    display:false
                  }
                },
                scales:{
                  x:{
                    ticks:{
                      maxTicksLimit:7
                    }
                  },
                  y:{
                    beginAtZero:true
                  }
                }
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
                plugins:{
                  legend:{
                    display:false
                  }
                },
                scales:{
                  y:{
                    beginAtZero:true
                  }
                }
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
                plugins:{
                  legend:{
                    display:false
                  }
                },
                scales:{
                  y:{
                    beginAtZero:true
                  }
                }
              }}
            />


          </DashboardSectionCard>


        </Grid>


        <Grid item xs={12} md={6} lg={3}>

          <DashboardSectionCard title="City-wise Collection">


         <AnalyticsChart
  type="bar"
  data={cityChartData}
  options={{
  plugins:{
    legend:{
      display:false
    }
  },
  scales:{
    x:{
      ticks:{
        display:true,
        autoSkip:false,
        maxRotation:45,
        minRotation:45
      },
      title:{
        display:true,
        text:"City"
      }
    },
    y:{
      beginAtZero:true,
      title:{
        display:true,
        text:"Bottle Collections"
      }
    }
  }
}}
/>


          </DashboardSectionCard>


        </Grid>


      </Grid>






      








     


      {/* MAP */}


      <Grid container spacing={2} sx={{ mt:2 }}>


        <Grid item xs={12}>


          <DashboardSectionCard title="Smart Bin Map">


            <SmartBinMap height={420} />


          </DashboardSectionCard>


        </Grid>


      </Grid>





      {/* TABLES */}


      <Grid container spacing={2} sx={{ mt:2 }}>


        <Grid item xs={12} md={6}>


          <DashboardSectionCard title="Smart Bin Analytics">


            <DashboardTable
              columns={smartBinsColumns}
              rows={smartBins}
            />


          </DashboardSectionCard>


        </Grid>





        <Grid item xs={12} md={6}>


          <DashboardSectionCard title="Recent Manufacturer Registrations">


            <DashboardTable

              columns={registrationsColumns}

              rows={people}

            />


          </DashboardSectionCard>


        </Grid>


      </Grid>










    </Box>
  );

}