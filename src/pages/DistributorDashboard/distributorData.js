const distributorData = {
  summary: {
    totalDistributed: 124560,
    totalRecycled: 78430,
    activeCities: 18,
    highestDemandProduct: 'Sprite 500ml',
    recyclingRate: 63.07,
  },

  cities: ['Kochi', 'Trivandrum', 'Kozhikode', 'Thrissur', 'Alappuzha'],

  products: ['Sprite 500ml', 'Pepsi 500ml', 'Coca-Cola 1L', 'Fanta 500ml'],

  demandByCity: {
    'Kochi': [18450, 10250, 6120, 4200],
    'Trivandrum': [14320, 8230, 5020, 3110],
    'Kozhikode': [10250, 8420, 5120, 1980],
    'Thrissur': [8430, 7890, 3120, 1850],
    'Alappuzha': [6210, 4850, 1980, 1350],
  },

  monthlyTrend: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    values: [42000, 48000, 52000, 56000, 60000, 65000],
  },

  insights: [
    'Sprite 500ml has the highest demand in Kochi.',
    'Pepsi demand increased in Thrissur.',
    'Coca-Cola demand is decreasing in Kozhikode.',
    'Overall recycling rate improved this month.',
  ],

  tableRows: [
    { product: 'Sprite 500ml', city: 'Kochi', distributed: 12450, recycled: 8930, recyclingPct: 71.7, demandLevel: 'High' },
    { product: 'Pepsi 500ml', city: 'Kochi', distributed: 8210, recycled: 5860, recyclingPct: 71.3, demandLevel: 'Medium' },
    { product: 'Sprite 500ml', city: 'Trivandrum', distributed: 10300, recycled: 7450, recyclingPct: 72.3, demandLevel: 'High' },
    { product: 'Pepsi 500ml', city: 'Thrissur', distributed: 7890, recycled: 5485, recyclingPct: 69.5, demandLevel: 'Medium' },
    { product: 'Coca-Cola 1L', city: 'Kozhikode', distributed: 5120, recycled: 2840, recyclingPct: 55.4, demandLevel: 'Low' },
    { product: 'Fanta 500ml', city: 'Alappuzha', distributed: 3850, recycled: 1980, recyclingPct: 51.4, demandLevel: 'Low' },
  ],

  topDemandByCity: [
    { city: 'Kochi', product: 'Sprite 500ml', qty: 18450 },
    { city: 'Trivandrum', product: 'Sprite 500ml', qty: 14320 },
    { city: 'Kozhikode', product: 'Pepsi 500ml', qty: 10250 },
    { city: 'Thrissur', product: 'Pepsi 500ml', qty: 8430 },
    { city: 'Alappuzha', product: 'Sprite 500ml', qty: 6210 },
  ],
};

export default distributorData;
