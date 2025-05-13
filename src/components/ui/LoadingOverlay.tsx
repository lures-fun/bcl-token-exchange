import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import StylishLoader from './StylishLoader';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'ログイン中...',
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: alpha('#000', 0.7),
        zIndex: 9999,
        backdropFilter: 'blur(8px)',
        transition: 'opacity 0.3s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          borderRadius: 2,
          backgroundColor: alpha('#fff', 0.1),
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: `1px solid ${alpha('#fff', 0.1)}`,
        }}
      >
        <StylishLoader size={36} />

        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            fontWeight: 500,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingOverlay;
