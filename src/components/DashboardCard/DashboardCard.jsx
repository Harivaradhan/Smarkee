import { Card, CardContent, Typography } from '@mui/material';

export default function DashboardCard({ title, description }) {
  return (
    <Card sx={{ borderRadius: 4, minWidth: 280, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
