import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fade,
  alpha,
} from '@mui/material';
import OrderRow from '@/src/components/History/OrderRow';
import { Order } from '@/types/Order';

interface HistoryOrdersTableProps {
  displayedOrders: Order[];
  onToggleCouponUsed: (couponId: string, isUsed: boolean) => void;
  isSmallMobile: boolean;
  isMobile: boolean;
}

const HistoryOrdersTable = ({
  displayedOrders,
  onToggleCouponUsed,
  isSmallMobile,
  isMobile,
}: HistoryOrdersTableProps) => (
  <Fade in={true} timeout={500}>
    <Paper
      elevation={0}
      sx={{
        mb: { xs: 2, sm: 3, md: 4 },
        borderRadius: { xs: '12px', md: '16px' },
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        overflow: { xs: 'auto', md: 'hidden' },
      }}
    >
      <TableContainer sx={{ minWidth: isSmallMobile ? 400 : isMobile ? 500 : undefined }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: alpha('#f3f4f6', 0.7),
                '& th': {
                  borderBottom: `2px solid ${alpha('#e5e7eb', 0.8)}`,
                  padding: isSmallMobile ? '10px 6px' : isMobile ? '12px 8px' : '16px',
                },
              }}
            >
              <TableCell width={isSmallMobile ? '36px' : isMobile ? '48px' : '60px'}></TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : undefined,
                }}
              >
                注文番号
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : undefined,
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                注文日時
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : undefined,
                  display: { xs: 'none', md: 'table-cell' },
                }}
              >
                トランザクション
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : undefined,
                }}
              >
                合計
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.map((order) => (
              <OrderRow key={order.id} order={order} onToggleCouponUsed={onToggleCouponUsed} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Fade>
);

export default HistoryOrdersTable;
