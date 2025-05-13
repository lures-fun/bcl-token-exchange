import React from 'react';
import { Typography, Box, alpha } from '@mui/material';

interface HistoryPageHeaderProps {
  isMobile: boolean;
  isSmallMobile: boolean;
  gradientBg: string;
}

const HistoryPageHeader = ({ isMobile, isSmallMobile, gradientBg }: HistoryPageHeaderProps) => (
  <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
    <Typography
      variant={isSmallMobile ? 'h5' : 'h4'}
      sx={{
        fontWeight: 700,
        mb: { xs: 0.5, sm: 1 },
        background: gradientBg,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : undefined,
      }}
    >
      購入履歴
    </Typography>
    <Typography
      variant={isMobile ? 'body2' : 'body1'}
      sx={{
        color: alpha('#000', 0.6),
        maxWidth: '800px',
        fontSize: isSmallMobile ? '0.8rem' : undefined,
      }}
    >
      過去の注文履歴とクーポン情報を確認できます。クーポンを使用したら、チェックボックスをオンにして管理しましょう。
    </Typography>
  </Box>
);

export default HistoryPageHeader;
