import { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function ScanHistory() {
  const [scanHistory, setScanHistory] = useState([]);

  const fetchScanHistory = async () => {
    try {
      const response = await axios.get("http://13.60.20.124:8000/reward/all/");
      const rewards = response.data.rewards || [];

      const sorted = [...rewards].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setScanHistory(sorted);
    } catch (error) {
      console.error("Error fetching scan history:", error);
    }
  };

  useEffect(() => {
    fetchScanHistory();
  }, []);

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
              <TableRow key={row.reward_id}>
                <TableCell>{new Date(row.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{row.reward_id}</TableCell>
                <TableCell>{row.total_points}</TableCell>
                <TableCell>{row.claimed ? "Claimed" : "Available"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}