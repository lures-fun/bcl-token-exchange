import { TableRow, Box, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell/TableCell';
import Image from 'next/image';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { OrderItem } from '@/types/Order';

const OrderItemRow = ({ item, isMobile }: { item: OrderItem; isMobile: boolean }) => (
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            position: 'relative',
            width: isMobile ? 40 : 60,
            height: isMobile ? 40 : 60,
            minWidth: isMobile ? 40 : 60,
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            mr: isMobile ? 1 : 2,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2) 100%)',
              zIndex: 1,
            },
          }}
        >
          <Image
            src={item.imageUrl}
            alt={item.productName}
            fill
            sizes={isMobile ? '40px' : '60px'}
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Typography
          variant={isMobile ? 'caption' : 'body2'}
          sx={{
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {item.productName}
        </Typography>
      </Box>
    </TableCell>
    <TableCell align="center">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LocalOfferOutlinedIcon
          sx={{
            color: '#426bff',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            mr: 0.5,
            opacity: 0.7,
          }}
        />
        <Typography variant={isMobile ? 'caption' : 'body2'}>{item.priceInTokens} BBT</Typography>
      </Box>
    </TableCell>
    <TableCell align="center">
      <Typography variant={isMobile ? 'caption' : 'body2'}>{item.quantity}</Typography>
    </TableCell>
    <TableCell align="right">
      <Typography
        variant={isMobile ? 'caption' : 'body2'}
        sx={{
          fontWeight: 600,
          background: 'linear-gradient(90deg, #1dd7d0, #426bff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {item.priceInTokens * item.quantity} BBT
      </Typography>
    </TableCell>
  </TableRow>
);

export default OrderItemRow;
