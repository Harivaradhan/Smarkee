import { Card, CardContent, Typography, Box } from '@mui/material';

export default function DashboardMetricCard({ icon, label, value, trend, caption, color }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, transition: 'transform 0.24s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          {icon}
        </Box>
        <Typography variant="h5" fontWeight={700} sx={{ color: color || 'text.primary' }}>
          {value}
        </Typography>
        {trend && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            {trend}
          </Typography>
        )}
        {caption && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {caption}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
