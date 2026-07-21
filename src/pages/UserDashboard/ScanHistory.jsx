import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { scanHistory } from './userData.js';

export default function ScanHistory() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Scan History
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Your bottle recycling timeline and points history.
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Bottle ID</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scanHistory.map((row) => (
              <TableRow key={row.bottleId}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.bottleId}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
