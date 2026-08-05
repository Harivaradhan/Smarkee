import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';

export default function DashboardTable({ columns, rows = [], onView }) {
  const inferredColumns = React.useMemo(() => {
    if (columns && columns.length) return columns;
    if (!rows || rows.length === 0) return [];
    const keys = Object.keys(rows[0]);
    return keys.map((k) => ({ field: k, headerName: k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()) }));
  }, [columns, rows]);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, maxHeight: 360, overflow: 'auto' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.paper' }}>
          <TableRow>
            {inferredColumns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 700, color: 'text.secondary' }}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.id ?? rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {inferredColumns.map((column) => {
                const value = row[column.field];
                if (column.field === 'status') {
                  return (
                    <TableCell key={column.field}>
                      <Chip label={value} color={value === 'Active' ? 'success' : value === 'Offline' ? 'error' : 'warning'} size="small" />
                    </TableCell>
                  );
                }
                if (column.field === 'action') {
                  return (
                    <TableCell key={column.field}>
                      <Button variant="contained" size="small" onClick={() => onView?.(row)}>
                        View
                      </Button>
                    </TableCell>
                  );
                }
                return <TableCell key={column.field}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
