import React from 'react';
import { Typography, Box, Paper, Button, Fade, alpha } from '@mui/material';
import ShopIcon from '@mui/icons-material/Shop';

interface EmptyOrdersMessageProps {
  isSmallMobile: boolean;
  isMobile: boolean;
  gradientBg: string;
}

const EmptyOrdersMessage = ({ isSmallMobile, isMobile, gradientBg }: EmptyOrdersMessageProps) => (
  <Fade in={true} timeout={500}>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: { xs: '12px', md: '16px' },
        textAlign: 'center',
        backgroundColor: alpha('#fff', 0.9),
        border: '1px dashed rgba(0, 0, 0, 0.1)',
      }}
    >
      <ShopIcon
        sx={{
          fontSize: isSmallMobile ? 36 : isMobile ? 42 : 48,
          color: alpha('#000', 0.2),
          mb: { xs: 1, sm: 2 },
        }}
      />
      <Typography
        variant={isSmallMobile ? 'subtitle1' : isMobile ? 'h6' : 'h6'}
        sx={{
          mb: 1,
          fontWeight: 600,
          fontSize: isSmallMobile ? '1.1rem' : undefined,
        }}
      >
        注文が見つかりません
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: alpha('#000', 0.6),
          mb: { xs: 2, sm: 3 },
          fontSize: isSmallMobile ? '0.8rem' : undefined,
        }}
      >
        まだ注文履歴がないか、検索条件に一致する注文がありません。
      </Typography>
      <Button
        variant="contained"
        href="/shop"
        size={isMobile ? 'small' : 'medium'}
        sx={{
          background: gradientBg,
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '30px',
          px: { xs: 3, md: 4 },
          py: { xs: 0.8, md: 1 },
          fontSize: isSmallMobile ? '0.8rem' : undefined,
          '&:hover': {
            background: 'linear-gradient(90deg, #19c2bb, #3b60e5)',
            boxShadow: '0 6px 12px rgba(29, 215, 208, 0.2), 0 2px 4px rgba(66, 107, 255, 0.2)',
          },
        }}
      >
        ショップを見る
      </Button>
    </Paper>
  </Fade>
);

export default EmptyOrdersMessage;
