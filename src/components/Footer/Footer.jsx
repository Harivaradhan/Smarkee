import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'text.secondary' }}>
      <Typography variant="body2">© 2026 Smarkee. Smart Bottle Traceability Platform.</Typography>
    </Box>
  );
}
