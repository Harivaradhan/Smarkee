import { useState } from 'react';
import { Box, Typography, Grid, Paper, Avatar, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
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
import useAuth from '../../hooks/useAuth.js';
import productService from '../../services/productService.js';

export default function ManufacturerDashboard() {
  const { user } = useAuth();
  const [addOpen, setAddOpen] = useState(false);
  const [productForm, setProductForm] = useState({ productName: '', barcode: '', size: '' });
  const [formErrors, setFormErrors] = useState({});
  const [adding, setAdding] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm((p) => ({ ...p, [name]: value }));
  };

  const validateProduct = () => {
    const errs = {};
    if (!productForm.productName.trim()) errs.productName = 'Product Name is required.';
    if (!productForm.barcode.trim()) errs.barcode = 'Barcode is required.';
    if (!productForm.size.trim()) errs.size = 'Size is required.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitProduct = async () => {
    if (!validateProduct()) return;
    setAdding(true);
    setFormErrors({});
    try {
      const manufacturerId = user?.id || Number(import.meta.env.VITE_MANUFACTURER_ID) || 0;
      await productService.addProduct({
        manufacturerId,
        productName: productForm.productName,
        barcode: productForm.barcode,
        size: productForm.size,
      });
      setSnackMessage('Product added successfully');
      setSnackOpen(true);
      setProductForm({ productName: '', barcode: '', size: '' });
      closeAdd();
      // TODO: refresh product list if present
    } catch (err) {
      if (err.fieldErrors) {
        // map backend keys to our form keys when needed
        const mapped = {};
        Object.entries(err.fieldErrors).forEach(([k, v]) => {
          if (k === 'product_name') mapped.productName = v;
          else mapped[k] = v;
        });
        setFormErrors(mapped);
      }
      setSnackMessage(err.message || 'Failed to add product');
      setSnackOpen(true);
    } finally {
      setAdding(false);
    }
  };
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
        <Box>
          <Button variant="contained" onClick={openAdd} sx={{ py: 1 }}>
            Add Product
          </Button>
        </Box>
      </Box>

      <Dialog open={addOpen} onClose={closeAdd} fullWidth maxWidth="sm">
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="productName"
            value={productForm.productName}
            onChange={handleProductChange}
            error={Boolean(formErrors.productName)}
            helperText={formErrors.productName}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Barcode"
            name="barcode"
            value={productForm.barcode}
            onChange={handleProductChange}
            error={Boolean(formErrors.barcode)}
            helperText={formErrors.barcode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Size"
            name="size"
            value={productForm.size}
            onChange={handleProductChange}
            error={Boolean(formErrors.size)}
            helperText={formErrors.size}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAdd} disabled={adding}>Cancel</Button>
          <Button onClick={submitProduct} variant="contained" disabled={adding}>
            {adding ? 'Adding...' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity={formErrors && Object.keys(formErrors).length ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>

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
