import React from 'react';
import { Grid, Box, Typography, alpha, useTheme } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { gradientBg } from '@/src/styles/styeleConstants';

interface BreadcrumbProps {
  currentPage: string;
  homeUrl?: string;
}

const StylishBreadcrumb = ({ currentPage, homeUrl = '/shop' }: BreadcrumbProps) => {
  const theme = useTheme();

  // リンクスタイル
  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.mode === 'dark' ? alpha('#fff', 0.7) : alpha('#000', 0.6),
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateX(2px)',
      background: gradientBg,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  };

  // セパレータースタイル
  const separatorStyle = {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.mode === 'dark' ? alpha('#fff', 0.3) : alpha('#000', 0.3),
    mx: 0.5,
  };

  // 現在のページスタイル
  const currentPageStyle = {
    display: 'flex',
    alignItems: 'center',
    background: gradientBg,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 600,
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: { xs: 'normal', sm: 'nowrap' },
    maxWidth: { xs: '180px', sm: '300px', md: '400px' },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: 0,
      width: '100%',
      height: '2px',
      background: gradientBg,
      borderRadius: '2px',
    },
  };

  return (
    <Grid item xs={12} sx={{ mb: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 1.5,
          px: { xs: 1, md: 2 },
          borderRadius: '10px',
          background: theme.palette.mode === 'dark' ? alpha('#fff', 0.05) : alpha('#f5f5f5', 0.7),
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.025)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '@media (hover: hover)': {
            '&:hover': {
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              background:
                theme.palette.mode === 'dark' ? alpha('#fff', 0.07) : alpha('#f5f5f5', 0.9),
            },
          },
          borderLeft: `3px solid ${alpha('#1dd7d0', 0.7)}`,
        }}
      >
        {/* Home Link */}
        <Link href={homeUrl} passHref>
          <Box sx={linkStyle}>
            <HomeOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography component="span" sx={{ fontSize: '0.9rem' }}>
              Shop
            </Typography>
          </Box>
        </Link>

        {/* Separator */}
        <Box sx={separatorStyle}>
          <NavigateNextIcon fontSize="small" />
        </Box>

        {/* Current Page - テキスト長さに対応 */}
        <Box sx={{ overflow: 'hidden', flex: 1 }}>
          <Typography sx={{ ...currentPageStyle, fontSize: '0.9rem' }}>{currentPage}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default StylishBreadcrumb;
