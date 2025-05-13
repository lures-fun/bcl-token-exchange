import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const EmptyCart = () => {
  const router = useRouter();

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="body1">カートに商品がありません。</Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          background: 'linear-gradient(90deg, #23EEE3, #5271FF)',
          color: '#fff',
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            background: 'linear-gradient(90deg, #1dd7d0, #426bff)',
          },
        }}
        onClick={() => router.push('/shop')}
      >
        ショッピングに戻る
      </Button>
    </Box>
  );
};

export default EmptyCart;
