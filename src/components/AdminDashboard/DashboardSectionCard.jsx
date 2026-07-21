import { Card, CardContent, Typography, Box } from '@mui/material';

export default function DashboardSectionCard({ title, children, action }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
