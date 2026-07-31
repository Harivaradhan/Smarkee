import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from '@mui/material';
import { Login as LoginIcon, Person, Lock } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth.js';
import { getRoleRedirectPath } from '../../utils/validation.js';
import Logo from '../../assets/logo.png';

const roles = [
  'Admin',
  'Manufacturer',
  'Distributor',
  'User',
];

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', role: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.username.trim()) nextErrors.username = 'Username is required.';
    if (!form.password.trim()) nextErrors.password = 'Password is required.';
    if (!form.role) nextErrors.role = 'Role is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    // Frontend demo login: single shared credentials for local development
    const demoUsername = 'admin';
    const demoPassword = 'admin123';

    if (form.username === demoUsername && form.password === demoPassword) {
      // set demo token and user in localStorage
      const userObj = { username: form.username, fullName: 'Demo User', role: form.role };
      localStorage.setItem('smarkee_token', 'demo-token');
      localStorage.setItem('smarkee_user', JSON.stringify(userObj));
      const redirectPath = getRoleRedirectPath(form.role);
      // force full page load so AuthProvider re-reads localStorage and updates context
      window.location.assign(redirectPath);
      return;
    }

    // fallback to real auth if available
    try {
      const user = await login(form);
      const redirectPath = getRoleRedirectPath(user?.role || form.role);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrors({ submit: 'Invalid Username or Password' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        background: 'radial-gradient(circle at top left, rgba(46,125,50,0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(21,101,192,0.18), transparent 30%)',
      }}
    >
      <Paper sx={{ maxWidth: 520, width: '100%', p: 4, borderRadius: 4, boxShadow: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ mx: 'auto', width: 90, height: 90, mb: 2 }}>
            <img src={Logo} alt="Smarkee Logo" style={{ width: '100%', height: '100%' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Smarkee
          </Typography>
         
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
            error={Boolean(errors.username)}
            helperText={errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth margin="normal" error={Boolean(errors.role)}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            {errors.role && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {errors.role}
              </Typography>
            )}
          </FormControl>

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

          {errors.submit && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.submit}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 3 }}>
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5 }} disabled={loading}>
              <LoginIcon sx={{ mr: 1 }} />
              Login
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="large"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={() => navigate('/register')}
            >
              New Registration
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
