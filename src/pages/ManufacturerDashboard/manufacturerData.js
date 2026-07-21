import Logo from '../../assets/logo.png';

export const productInfo = {
  image: Logo,
  name: 'AquaPure Classic',
  id: 'PROD-APC-2026',
  category: 'Bottled Water',
  size: '750 ml',
  status: 'Active',
};

export const metrics = [
  { label: 'Total Bottles Sold', value: '42,800', trend: '+3.2%', color: '#1e3e2b' },
  { label: 'Total Bottles Recycled', value: '18,540', trend: '+6.1%', color: '#1976D2' },
  { label: 'Recycling %', value: '43.3%', trend: '+2.4%', color: '#388E3C' },
  { label: 'Highest Demand Region', value: 'Kochi', color: '#1565C0' },
];

export const demandTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Demand',
      data: [3200, 3600, 4100, 3800, 4600, 5200, 5800],
      borderColor: '#2E7D32',
      backgroundColor: 'rgba(46,125,50,0.12)',
      fill: true,
      tension: 0.3,
    },
  ],
};

export const topCities = {
  labels: ['Kochi', 'Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai'],
  datasets: [
    {
      label: 'Bottles Sold',
      data: [12500, 9800, 7600, 5400, 4200],
      backgroundColor: ['#2E7D32', '#1976D2', '#388E3C', '#0288D1', '#66BB6A'],
    },
  ],
};

export const tableRows = [
  { region: 'Kochi', sold: 12500, recycled: 6200, recycling: '49.6%' },
  { region: 'Chennai', sold: 9800, recycled: 3500, recycling: '35.7%' },
  { region: 'Bengaluru', sold: 7600, recycled: 3000, recycling: '39.5%' },
  { region: 'Hyderabad', sold: 5400, recycled: 2100, recycling: '38.9%' },
  { region: 'Mumbai', sold: 4200, recycled: 740, recycling: '17.6%' },
];

export const insights = [
  'Highest demand is in Kochi.',
  'Recycling rate increased this month.',
  'Chennai has lower demand than last month.',
];
