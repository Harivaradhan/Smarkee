import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from '@mui/material';
import { AccountCircle, Email, Phone, Lock, LocationOn, Business } from '@mui/icons-material';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validation.js';
import customerService from '../../services/customerService.js';

const roles = ['User', 'Manufacturer', 'Consumer'];

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: '',
    pinCode: '',
    companyName: '',
    gstNumber: '',
    address: '',
    licenseNumber: '',
    shopName: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setForm({ ...form, companyName: '', gstNumber: '', address: '', licenseNumber: '', shopName: '' });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full Name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.mobile.trim()) nextErrors.mobile = 'Mobile Number is required.';
    else if (!validatePhone(form.mobile)) nextErrors.mobile = 'Enter a 10-digit phone number.';
    if (!validatePassword(form.password)) nextErrors.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords must match.';
    if (!role) nextErrors.role = 'Role is required.';
    if (!form.country.trim()) nextErrors.country = 'Country is required.';
    if (!form.state.trim()) nextErrors.state = 'State is required.';
    if (!form.city.trim()) nextErrors.city = 'City is required.';
    if (!form.pinCode.trim()) nextErrors.pinCode = 'PIN Code is required.';

    if (role === 'Manufacturer') {
      if (!form.companyName.trim()) nextErrors.companyName = 'Company Name is required.';
      if (!form.gstNumber.trim()) nextErrors.gstNumber = 'GST Number is required.';
      if (!form.address.trim()) nextErrors.address = 'Company Address is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitMessage('');
    setSubmitError(false);

    if (!validate()) return;

    setLoading(true);
    try {
      await customerService.registerCustomer({ form, role });
      setSubmitMessage('Registration successful. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (error) {
      const fieldErrors = error.fieldErrors || {};
      setErrors((current) => ({ ...current, ...fieldErrors }));
      setSubmitError(true);
      setSubmitMessage(error.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px)', py: 4, px: 2, backgroundColor: 'background.default' }}>
      <Paper sx={{ maxWidth: 960, mx: 'auto', p: 4, borderRadius: 4, boxShadow: 5 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          New Registration
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Create your Smarkee account to track the lifecycle of smart bottles from production to recycling.
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Personal Information
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.mobile)}
                helperText={errors.mobile}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Location Information
              </Typography>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.country)}
                helperText={errors.country}
                InputProps={{ startAdornment: <LocationOn sx={{ mr: 1 }} /> }}
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.state)}
                helperText={errors.state}
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.city)}
                helperText={errors.city}
              />
              <TextField
                fullWidth
                label="PIN Code"
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                margin="normal"
                error={Boolean(errors.pinCode)}
                helperText={errors.pinCode}
              />

              <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ mt: 4 }}>
                Professional Information
              </Typography>
              <FormControl fullWidth margin="normal" error={Boolean(errors.role)}>
                <InputLabel id="register-role-label">Role</InputLabel>
                <Select
                  labelId="register-role-label"
                  label="Role"
                  value={role}
                  onChange={handleRoleChange}
                >
                  {roles.map((roleOption) => (
                    <MenuItem key={roleOption} value={roleOption}>
                      {roleOption}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && (
                  <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                    {errors.role}
                  </Typography>
                )}
              </FormControl>

              {role === 'Manufacturer' && (
                <>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.companyName)}
                    helperText={errors.companyName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.gstNumber)}
                    helperText={errors.gstNumber}
                  />
                  <TextField
                    fullWidth
                    label="Company Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                  />
                </>
              )}

            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
            <Button type="submit" variant="contained" size="large" sx={{ py: 1.5 }} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Button variant="text" color="primary" onClick={() => navigate('/login')}>
              Already have an account? Login
            </Button>
            {submitMessage && (
              <Typography variant="body2" color={submitError ? 'error' : 'success.main'} sx={{ mt: 1 }}>
                {submitMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
